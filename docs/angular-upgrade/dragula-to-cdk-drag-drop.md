# Migrating drag and drop from ng2-dragula to @angular/cdk

This document records how the widget builder renders layouts and wires up its drop zones, and which `@angular/cdk/drag-drop` connection strategy reproduces the current behaviour. It is the result of a read-only investigation of the code as it stands on `master` (Angular 13.2, `ng2-dragula@1.5.0`, `@angular/cdk` not yet installed).

The reason this matters: in dragula, all drop zones sharing a bag name are connected automatically wherever they sit in the DOM. CDK works the other way round — drop lists are isolated unless explicitly connected, either through a `cdkDropListGroup` on a shared DOM ancestor or through `cdkDropListConnectedTo` with explicit ids. Choosing between those requires knowing how many layouts are on screen and which regions are meant to be connected.

## Summary

- Multiple layout components are rendered at the same time, one per row of the page.
- Dragula connects **every region on the page across every row**, not just the regions within one layout.
- Because of that, a `cdkDropListGroup` per layout would be a silent regression. The recommended approach is a single `cdkDropListGroup` on the existing `.page-inner` element.
- There is no runtime layout switching, no nested drop zones and no copy mode. Only one dragula option is configured.
- One risk needs a spike before committing to the approach — see [Recommended approach](#recommended-approach).

## How layouts are rendered

Layouts are not selected one at a time. There is no `*ngIf`, `ngSwitch`, router outlet or `ngComponentOutlet` choosing between them anywhere in the codebase. Instead, the builder renders one `app-row-preview` per row of the page:

```html
<!-- widget-builder/widget-builder.component.html:19-29 -->
<div class="page">
  <div *ngIf="editingPage" class="page-inner">
    <app-row-preview
      *ngFor="let row of editingPage.rows; let i = index"
      [rows]="editingPage.rows"
      [index]="i"
      [row]="row"
      (widgetSelected)="editWidget($event)"
    ></app-row-preview>
    <app-add-row [page]="editingPage"></app-add-row>
  </div>
</div>
```

Each row preview then instantiates its own layout component into a local `ViewContainerRef`, resolved from the row's `type` through the `LayoutTypeRegistry`:

```typescript
// widget-builder/components/row-preview/row-preview.component.ts:76-87
ngOnInit() {
  const componentType = this.layoutTypeRegistry.getLayoutType(this.row.type);
  const componentFactory =
    this._componentFactoryResolver.resolveComponentFactory(
      componentType.component
    );
  const viewContainerRef = this.preview.viewContainerRef;
  viewContainerRef.clear();

  const componentRef = viewContainerRef.createComponent(componentFactory);
  (<AbstractLayoutDirective>componentRef.instance).regions = this.row.regions;
}
```

A page with four rows therefore holds four live layout component instances, potentially of four different layout types. All five layout components are declared eagerly in `WidgetBuilderModule` precisely because any combination of them can be needed at once.

The layout components themselves are shells over a shared base; the regions arrive as a single input:

```typescript
// core/layout/components/abstract-layout.component.ts
@Directive()
export abstract class AbstractLayoutDirective {
  @Input() regions: any;
}
```

The resulting DOM, for a page with two rows:

```
.builder--wrapper                       overflow-y:auto -> CDK autoscroll host
└── #widget-builder-preview
    └── .preview-inner / .page
        └── div.page-inner              *ngIf="editingPage"   <- cdkDropListGroup goes here
            ├── app-row-preview         *ngFor over editingPage.rows
            │   └── .outer-row
            │       ├── app-row-edit    move up / move down / remove
            │       └── .row.layout--preview
            │           └── app-2-col-sidebar-left-layout      created dynamically
            │               └── div.row                        bootstrap flex row
            │                   ├── .sm-2.preview-col -> .layout--region   sidebar_left
            │                   └── .md-2.preview-col -> .layout--region   content
            ├── app-row-preview
            │   └── ... └── app-3-col-tripple-layout
            │               └── div.row
            │                   ├── .layout--region   sidebar_left
            │                   ├── .layout--region   content
            │                   └── .layout--region   sidebar_right
            └── app-add-row             appends a new row of any layout type
```

## Layout switching

There is no runtime layout switching. A row's layout is fixed when the row is created, and the only row operations are move up, move down and remove (`widget-builder/components/row-edit/row-edit.component.html`). The layout type is chosen once, from the registry:

```typescript
// widget-builder/components/add-row/add-row.component.ts:53-63
public addRow($event, layout: any) {
  $event.stopWidgetDeselect = true;

  const row = this.layoutTypeRegistry.getInstance(layout.type);
  this.page.addRow(row);

  this.widgetBuilderService.saveWidgetPage();
}
```

`RowPreviewComponent` builds its layout component in `ngOnInit` and implements no `ngOnChanges`, so even mutating `row.type` would not re-render it.

Consequently there is no widget-remapping logic anywhere, because nothing ever needs it. The only way to change a row's layout today is to delete the row and add a new one, which **discards** the widgets in it. Removal is modal-confirmed and then splices the row out of the array, which makes `*ngFor` destroy the `app-row-preview` and with it the dynamically created layout component.

Note that `src/styles/02_components/builder/layout/_builder_layoutSwitcher.scss` is a misleading filename: it contains only grid width classes (`.md-2`, `.sm-2`, `.tripple`, and so on), not a switcher.

### Incidental finding: dragula containers leak on row removal

`DragulaDirective` in `ng2-dragula@1.5.0` has no `ngOnDestroy`. It pushes onto `drake.containers` and `drake.models` on init and never removes itself, so deleted rows leave stale container elements and stale model arrays on the drake for the lifetime of the page. `CdkDropList` deregisters itself properly, so this leak disappears with the migration.

## Common DOM ancestor

Suitable ancestors exist at two levels, and both are existing elements.

**Per layout**, each layout template's root `<div class="row">` encloses all of that layout's `.layout--region` drop zones. The three-column layouts add a second candidate, `<div class="cnw_w">`:

```html
<!-- widget-builder/components/layouts/3col-tripple/3col-tripple.component.html:1-15, abridged -->
<div class="row">
  <div class="cnw_w">
    <div class="tripple preview-col cnw_sideCol cnw_left xs">
      <div
        [dragula]="'widget-container'"
        class="layout--region"
        [dragulaModel]="regions.sidebar_left.widgets"
      >
        <app-widget-preview
          [widget]="widget"
          *ngFor="let widget of regions.sidebar_left.widgets"
        ></app-widget-preview>
      </div>
      <app-add-widget [region]="regions.sidebar_left"></app-add-widget>
    </div>
    <!-- .cnw_center -> content, .cnw_right -> sidebar_right, same shape -->
  </div>
</div>
```

**Across all rows**, the ancestor is `div.page-inner` in `widget-builder.component.html`, which encloses every drop zone on the page.

### Do not insert a wrapper element

`cdkDropListGroup` is an attribute directive, so it can be applied to an element that already exists and changes no computed style. That matters here, because adding a wrapper `<div>` would break the layout in two ways.

Bootstrap is imported wholesale in `src/styles/style.scss`, so `.row` is Bootstrap's flex row and the `.preview-col` children are flex items sized by explicit width percentages (`.md-2 { width: 70% }`, `.tripple { width: 33.33% }`, and so on, in `_builder_layoutSwitcher.scss`). A new element between `.row` and the columns would become the single flex item and collapse the columns into a vertical stack.

There is also a positional selector aimed at the dynamically created layout host:

```scss
// styles/02_components/builder/layout/_builder_components-grid.scss:33-35
.layout--preview > :first-child {
  width: 100%;
}
```

That targets `<app-*-layout>` as the first child of `.row.layout--preview`. Any element inserted at that position takes the rule instead.

## Cross-region drag

Widgets are genuinely meant to move between regions, and — more than that — between rows.

ng2-dragula handles same-container reorder and cross-container transfer as two distinct branches:

```javascript
// node_modules/ng2-dragula/components/dragula.provider.js:82-104
drake.on('drop', function (dropElm, target, source) {
  if (!drake.models || !target) {
    return;
  }
  dropIndex = _this.domIndexOf(dropElm, target);
  sourceModel = drake.models[drake.containers.indexOf(source)];

  if (target === source) {
    // reorder within one region
    sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
  } else {
    // move across regions
    var notCopy = dragElm === dropElm;
    var targetModel = drake.models[drake.containers.indexOf(target)];
    var dropElmModel = notCopy
      ? sourceModel[dragIndex]
      : JSON.parse(JSON.stringify(sourceModel[dragIndex]));
    if (notCopy) {
      sourceModel.splice(dragIndex, 1);
    }
    targetModel.splice(dropIndex, 0, dropElmModel);
    target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
  }
  _this.dropModel.emit([name, dropElm, target, source]);
});
```

It spans rows because a single drake exists for the whole page. `setOptions` creates it with no containers, and every `[dragula]` directive instance — in every layout, in every row — appends itself:

```javascript
// node_modules/ng2-dragula/components/dragula.directive.js:34-43
if (bag) {
  this.drake = bag.drake;
  checkModel(); // pushes this.dragulaModel onto drake.models
  this.drake.containers.push(this.container);
} else {
  this.drake = dragula(
    [this.container],
    Object.assign({}, this.dragulaOptions)
  );
  checkModel();
  this.dragulaService.add(this.dragula, this.drake);
}
```

All ten drop zones across the five layout templates hardcode the same bag name, `'widget-container'`, so a widget can be dragged from row 1's `sidebar_left` into row 3's `content`. This is a real capability of the shipped app.

The data model places no restriction on it. Regions are interchangeable widget arrays keyed from a fixed vocabulary of three names — `content`, `sidebar_left`, `sidebar_right` — with every layout composing a subset:

```typescript
// core/layout/region.ts
export class Region {
  widgets: Array<Widget>;
  constructor(widgets: Array<Widget> = []) {
    this.widgets = widgets;
  }
  addWidget(widget: Widget) {
    this.widgets.push(widget);
  }
}
```

Nothing marks a widget type as sidebar-only or content-only, and dragula's `accepts` predicate is left at its default of `always`.

## Nested drop zones

There are none. Widgets cannot contain widgets, so every drop zone is a flat, one-level list of leaf items and CDK's nesting semantics never come into play.

A widget preview renders its body as an opaque server-rendered HTML string, with no content projection and no child list:

```html
<!-- widget-builder/components/widgets/widget-preview.component.html:41-48 -->
<div class="widget-preview">
  <div
    class="preview-content"
    *ngIf="widgetPreview"
    [innerHTML]="widgetPreview | safeHTML"
  ></div>
  <a (click)="selectWidget($event, widget)" class="component-hyperspan"></a>
</div>
```

The model agrees — `Widget` (`core/widget/widget.ts`) is flat, with configuration in an untyped `settings` bag and no children.

The only other nested reorderable structure in the builder is the group-filters edit form, which nests filters and filter options two deep, but it reorders with buttons rather than dragging: it reuses the same `app-row-edit` component as the rows.

## Dragula options in use

Only `moves` is configured. This is the complete call:

```typescript
// widget-builder/widget-builder.component.ts:136-144
// Set the dragula options
this.dragulaService.setOptions(this.dragulaContainer, {
  moves: function (_el, _container, handle) {
    return (
      handle.classList.contains('fa-arrows-alt') ||
      handle.classList.contains('bnt-cnw-action--drag')
    );
  },
});
```

`this.dragulaContainer` is the string `'widget-container'`. Everything else falls through to dragula's defaults (verified in `node_modules/dragula/dragula.js:30-41`):

| Option                     | Effective value | Bearing on the migration                                                                                    |
| -------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| `moves`                    | custom          | The only real work. Restricts dragging to the move button and its icon — replace with `cdkDragHandle`.      |
| `copy`                     | `false`         | No copy mode. Plain moves only, so `transferArrayItem` suffices and no clone handling is needed.            |
| `accepts`                  | `always`        | Every region accepts every widget. No `cdkDropListEnterPredicate` needed.                                   |
| `revertOnSpill`            | `false`         | Dropping outside a region cancels and the item returns home, which is also CDK's default. Nothing to build. |
| `removeOnSpill`            | `false`         | Dragging out never deletes. Removal is modal-confirmed via the trash button only.                           |
| `copySortSource`           | `false`         | Not applicable without copy mode.                                                                           |
| `direction`                | `'vertical'`    | Matches CDK's default `cdkDropListOrientation="vertical"`.                                                  |
| `isContainer`              | `never`         | Containers are only the explicitly registered ones. Maps cleanly.                                           |
| `invalid`                  | `invalidTarget` | Default no-op predicate.                                                                                    |
| `ignoreInputTextSelection` | `true`          | Text selection inside inputs does not start a drag. CDK behaves equivalently given a handle.                |
| `mirrorContainer`          | `document.body` | Drag preview is portalled to `<body>`. CDK does the same by default.                                        |

The handle predicate pairs with this markup, where both the button and its `<i>` are valid grab targets:

```html
<!-- widget-builder/components/widgets/widget-preview.component.html:11-16 -->
<li class="move">
  <button class="btn btn-default btn-sm bnt-cnw-action--drag">
    <i class="fas fa-arrows-alt drag" aria-hidden="true"></i
    ><span>{{ 'LABEL_DRAG' | translate }}</span>
  </button>
</li>
```

The label `<span>` matches neither class, so grabbing the button's text does not currently start a drag. `cdkDragHandle` on the button would make the whole button draggable — a small behaviour improvement, worth noting so it is not mistaken for a regression.

### Three non-option dependencies that do need work

**1. Empty-region drop targets.** Dragula stamps `gu-unselectable` on `<body>` for the duration of a drag, and this rule hangs off it:

```scss
// styles/01_layout/_layout.scss:13-22
body.gu-unselectable {
  .layout--region {
    background-color: $cnw_color-blueLight2;
    border: 1px dotted $cnw_color-blueLight;
    min-height: 50px;
  }
  .outer-row {
    border: 1px dotted $cnw_color-blueLight;
  }
}
```

This is load-bearing. `.layout--region` has no other `min-height` anywhere in the stylesheets, so an empty region is zero-height and only becomes a 50px drop target mid-drag. CDK adds `.cdk-drop-list-dragging` to the list and `.cdk-drag-preview` / `.cdk-drag-placeholder` to the item, but nothing to `<body>`, so this affordance must be re-created — for example by toggling a class from `(cdkDragStarted)` and `(cdkDragEnded)`. Miss it and widgets become undroppable into empty regions.

**2. Auto-scroll.** `dom-autoscroller` is wired directly to dragula's `dragging` flag:

```typescript
// widget-builder/widget-builder.component.ts:146-159
// Get a reference to the widget-container drake
const drake = this.dragulaService.find(this.dragulaContainer);

this.scroll = autoScroll(document.querySelector('.builder--wrapper'), {
  margin: 30,
  maxSpeed: 25,
  scrollWhenOutside: true,

  // Only scroll when drake is dragging
  autoScroll: function () {
    return this.down && drake.drake.dragging;
  },
});
```

CDK auto-scrolls the nearest scrollable ancestor natively, and `.builder--wrapper` is already `overflow-y: auto`, so this should become a deletion rather than a port. The `margin` and `maxSpeed` values are tuned, so the scroll feel is worth checking against the current behaviour.

**3. Drag styling.** `src/styles/style.scss:3` imports `~dragula/dist/dragula.css` for `.gu-mirror`, `.gu-transit` and `.gu-hide`. Replace with equivalents for CDK's `.cdk-drag-preview`, `.cdk-drag-placeholder` and `.cdk-drag-animating`.

## Drop handler behaviour

The drop subscription is global to the bag and discards the event payload entirely — dragula emits `[bagName, el, target, source, sibling]` and none of it is read:

```typescript
// widget-builder/widget-builder.component.ts:161-164
// Subscribe to the drop event
this.dragulaDropSubscription = this.dragulaService.drop.subscribe(() => {
  this.onDragulaDrop();
});
```

There is no per-region wiring anywhere; one subscription covers every drop in every region of every row, which is only possible because the bag is page-wide. Under CDK this inverts: each `.layout--region` gets its own `(cdkDropListDropped)` binding inside the layout templates, and the event object becomes essential rather than ignored.

The handler itself mutates no state:

```typescript
// widget-builder/widget-builder.component.ts:231-236
/**
 * React to the dragula drop event
 */
private onDragulaDrop() {
  this.widgetBuilderService.saveWidgetPage();
}
```

`saveWidgetPage()` is called without a `widgetId`, which means:

- The call is debounced by 500ms (`debouncePromise` in the `WidgetBuilderService` constructor).
- `WidgetService.saveWidgetPage` clears the `widgetPageList` cache entry for the project and `PUT`s the entire widget page to `{apiUrl}/project/{project_id}/widget-page`.
- On response, `this.widgetPage.draft` is refreshed from `response.widgetPage.draft` — this is the dirty flag.
- No `widgetSave` or `widgetPreview` emission and no widget re-render, which is correct since a move does not change a widget's rendered content.

**The handler relies entirely on dragula having already mutated the arrays.** Because `[dragulaModel]` is bound to `regions.<name>.widgets` — the actual `Region.widgets` array instance reachable from `widgetPage.rows[i].regions[k].widgets` — dragula's splices mutate the saved model in place. Nothing in the application code moves a widget. CDK does not sync arrays, so the new per-region handler must call `moveItemInArray` when `event.previousContainer === event.container` and `transferArrayItem` otherwise, before saving.

### Ordering subtlety: the current code saves before the arrays are updated

The model mutation happens _after_ `saveWidgetPage()` is called, not before. In `DragulaService.setOptions`, `add()` runs `setupEvents` first — registering the listener that re-emits `drop` to Angular — and `handleModels`, the splicing listener, is registered second:

```javascript
// node_modules/ng2-dragula/components/dragula.provider.js:58-61
DragulaService.prototype.setOptions = function (name, options) {
  var bag = this.add(name, dragula(options)); // -> setupEvents registers the drop re-emitter
  this.handleModels(name, bag.drake); // -> registers the splicing listener, second
};
```

Dragula's emitter is synchronous and fires listeners in registration order (`contra/emitter`'s `et.forEach`; `dragula.js:43` creates it with no `async` option). The real sequence on a drop is therefore:

1. `dragulaService.drop` emits.
2. `onDragulaDrop()` runs and `saveWidgetPage()` schedules the debounced call.
3. `handleModels` splices the arrays.
4. 500ms later the debounced call serializes `widgetPage` and `PUT`s it.

It works only because the 500ms debounce outlasts the synchronous splice. Nothing is broken today, but the existing order is not a contract to preserve. Mutating the arrays and _then_ saving — the natural CDK shape — is strictly more correct and removes the coupling.

## Recommended approach

Use a single `cdkDropListGroup` on `.page-inner`, spanning the whole page. Not one per layout, and not explicit ids with `cdkDropListConnectedTo`. The change attaches to the element that already exists at `widget-builder.component.html:20`:

```html
<div *ngIf="editingPage" class="page-inner" cdkDropListGroup></div>
```

Rationale:

- **It matches what dragula actually does.** One bag holds every region on the page, so cross-row dragging works today. A per-layout group would connect only the two or three regions inside one row and quietly drop that capability.
- **It needs no DOM change.** `cdkDropListGroup` is an attribute directive and `.page-inner` already encloses everything, which avoids both CSS traps described under [Common DOM ancestor](#common-dom-ancestor).
- **It needs no id bookkeeping.** The explicit-id alternative means minting a stable unique id per (row, region) pair and recomputing every list's `cdkDropListConnectedTo` whenever a row is added, removed or reordered. With layouts created dynamically and rows mutated by array splices, that machinery would be pure overhead.
- **The remaining surface is small.** Only `moves` is configured, and there are no nested lists, no copy mode and no spill behaviour. The genuine work is per-region `(cdkDropListDropped)` handlers calling `moveItemInArray` / `transferArrayItem`, `cdkDragHandle` on the move button, and the three non-option dependencies above — of which the empty-region `min-height` is the one most likely to be missed.

### Risk to verify first

`CdkDropList` resolves its group through Angular's **element injector**, as an `@Optional() @SkipSelf()` dependency on `CdkDropListGroup` — not by walking the DOM. The layouts here are instantiated with `viewContainerRef.createComponent(...)`, so the group has to be reachable along the injector chain `.page-inner` → `app-row-preview` → the `ng-template appRowLayout` anchor → the layout component → its drop lists.

That chain should hold, because a `ViewContainerRef.createComponent` call with no explicit injector inherits the anchor's parent injector. This could not be verified from the code alone: `@angular/cdk` is not in `package.json` and is absent from `node_modules`.

**Spike it before committing**: one `cdkDropListGroup` on `.page-inner`, a page with two rows, drag a widget from row 1 to row 2. If element-injector traversal does not cross the dynamic-component boundary, the fallback is explicit ids with `cdkDropListConnectedTo`, computed centrally in `WidgetBuilderComponent` — which already owns the whole page model — and passed down through `AbstractLayoutDirective` as a second `@Input` alongside `regions`.

## Open questions

These could not be answered from the code and need a decision or a check:

1. **Is cross-row dragging intended or incidental?** The code fully supports it and dragula's global bag makes it work, but nothing states it was a deliberate product decision rather than a side effect of sharing one bag name. This is the single input that decides the group's scope. If cross-row dragging turns out to be unwanted, a per-layout group is both simpler and sidesteps the injector risk above.
2. **Does the backend restrict widget types per region?** The frontend imposes nothing: `accepts` is unrestricted and `Region` is an untyped widget array. If the API rejects, say, a search-results widget in `sidebar_left`, that constraint would need to surface as a `cdkDropListEnterPredicate`.
3. **Is the 50px empty-region target sufficient in practice?** The rule is clearly load-bearing, but how it feels — and whether the dotted-border affordance reads correctly once re-implemented on CDK's class hooks — needs a visual check.
4. **Regression safety.** `src/` contains no `.spec.ts` files. There is no automated coverage of drag behaviour, region transfer or page save, so every claim in this document rests on reading the source rather than on a passing test. Budget for manual verification, or add characterisation tests around `WidgetPage` region mutation before starting.
