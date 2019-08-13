import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WidgetEditDirective } from './directives/widget-edit.directive';
import { DragulaService } from 'ng2-dragula';
import { WidgetBuilderService } from './services/widget-builder.service';
import { WidgetTypeRegistry } from '../core/widget/services/widget-type-registry.service';
import { Widget } from 'app/core/widget/widget';
import { AbstractWidgetEditComponent } from '../core/widget/components/abstract-widget-edit-component';
import * as autoScroll from 'dom-autoscroller';
import { WidgetPage } from '../core/widget/widget-page';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../core/project/project';
import { BackButton } from '../core/topbar/back-button';
import { TopbarService } from '../core/topbar/services/topbar.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

/**
 * The widget builder component is used for editing a widget page.
 */
@Component({
  selector: 'app-widget-builder',
  templateUrl: './widget-builder.component.html',
})
export class WidgetBuilderComponent implements OnInit, OnDestroy {

  /**
   * Widget edit form
   */
  @ViewChild(WidgetEditDirective, { static: true }) editForm: WidgetEditDirective;

  /**
   * The currently active widget
   */
  public activeWidget: Widget;

  /**
   * The widget page currently being edited
   */
  public editingPage: WidgetPage;

  /**
   * Indicates if a widget is being edited or not
   */
  public editing: boolean;

  /**
   * Indicates the sidebar is being shown or not
   */
  public showSidebar = false;

  /**
   * View mode of the widget builder (eg. desktop, tablet,..)
   */
  public viewMode = 'desktop';

  /**
   * Reference to dom-autoscroller
   */
  public scroll: any;

  /**
   * Subscription to the widget selected observable
   */
  private widgetSelectedSubscription: Subscription;

  /**
   * Subscription to the dragula drop event
   */
  private dragulaDropSubscription: Subscription;

  /**
   * The dragula container name
   */
  private dragulaContainer = 'widget-container';

  /**
   * The current project
   */
  private project: Project;

  /**
   * Widgetbuilder sidebar subscription
   */
  private sidebarSubscription: Subscription;

  /**
   * WidgetBuilder constructor.
   * @param dragulaService
   * @param _componentFactoryResolver
   * @param widgetTypeRegistry
   * @param widgetBuilderService
   * @param route
   * @param topbarService
   */
  constructor(
    private dragulaService: DragulaService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private widgetTypeRegistry: WidgetTypeRegistry,
    private widgetBuilderService: WidgetBuilderService,
    private route: ActivatedRoute,
    private topbarService: TopbarService
  ) {  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { project: Project, widgetPage: WidgetPage }) => {
        this.project = data.project;
        this.editingPage = data.widgetPage;

        // Set the current page on the widget builder service
        this.widgetBuilderService.widgetPage = this.editingPage;
      });

    // Subscribe to the selected widget
    this.widgetSelectedSubscription = this.widgetBuilderService.widgetSelected$.subscribe(widget => {
      this.editWidget(widget);
    });

    // Subscribe to sidebar status
    this.sidebarSubscription = this.widgetBuilderService.sidebarStatus$.subscribe(status => {
      this.showSidebar = status;
    });

    // Set the dragula options
    this.dragulaService.setOptions(this.dragulaContainer, {
      moves: function (el, container, handle) {
        return handle.classList.contains('drag') || handle.classList.contains('bnt-cnw-action--drag');
      }
    });

    // Get a reference to the widget-container drake
    const drake = this.dragulaService.find(this.dragulaContainer);

    // Keep a reference to the dom-autoscroller
    this.scroll = autoScroll(document.querySelector('.builder--wrapper'), {
      margin: 30,
      maxSpeed: 25,
      scrollWhenOutside: true,

      // Only scroll when drake is dragging
      autoScroll: function () {
        return this.down && drake.drake.dragging;
      }
    });

    // Subscribe to the drop event
    this.dragulaDropSubscription = this.dragulaService.drop.subscribe((value) => {
      this.onDragulaDrop(value);
    });

    // Init the topbar
    this.initTopbar();

    // Attach the widgetPage CSS to the DOM
    if (this.editingPage.css) {
      this.widgetBuilderService.attachCss(this.editingPage.css);
    }
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.widgetSelectedSubscription.unsubscribe();
    this.dragulaDropSubscription.unsubscribe();

    // Destroy the dragula container
    this.dragulaService.destroy(this.dragulaContainer);

    // Remove any previously attached styles
    this.widgetBuilderService.removeCss();
  }

  /**
   * Start editing the given widget.
   * @param widget
   */
  public editWidget(widget?: Widget) {
    this.activeWidget = widget;

    const viewContainerRef = this.editForm.viewContainerRef;
    viewContainerRef.clear();

    // Render the widget edit component
    if (widget) {
      const widgetType = this.widgetTypeRegistry.getWidgetType(widget.type);
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(widgetType.editComponent);

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<AbstractWidgetEditComponent>componentRef.instance).widget = widget;
    }
  }

  /**
   * close the sidebar.
   */
  public closeSidebar() {
    this.showSidebar = false;
    this.widgetBuilderService.toggleWidgetbuilderSidebar(false);
  }

  /**
   * Deselect a widget
   * @param $event
   */
  public deselectWidget($event) {
    // Only deselect the widget when allowed by the event
    if (!$event.stopWidgetDeselect) {
      this.widgetBuilderService.selectWidget();
    }
  }

  /**
   * React to the dragula drop event
   */
  private onDragulaDrop(args) {
    this.widgetBuilderService.saveWidgetPage();
  }

  /**
   * Init the topbar
   */
  private initTopbar() {
    // Add a back button
    this.topbarService.setBackButton(new BackButton(
      BackButton.TYPE_ROUTE,
      this.project.name,
      null,
      ['/project', this.project.id]
    ));

    // Add the toolbar component and subscribe to it's events
    this.topbarService.addComponent('toolbar', ToolbarComponent, {widgetPage: this.editingPage})
      .subscribe(event => {
        switch (event.output) {
          case 'viewModeChanged':
            this.viewMode = event.value;
            break;
          case 'sidebarClose':
            this.closeSidebar();
            break;
        }
      });
  }
}
