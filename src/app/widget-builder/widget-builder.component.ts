import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { WidgetEditDirective } from './directives/widget-edit.directive';
import { DragulaService } from 'ng2-dragula';
import { WidgetEditComponent } from './widget-edit.component';
import { WidgetService } from '../widget.service';
import { WidgetBuilderService } from "./services/widget-builder.service";
import { WidgetTypeRegistry } from "../widget/services/widget-type-registry.service";
import { Widget } from "../widget/widget";


@Component({
  selector: 'app-widget-builder',
  templateUrl: './widget-builder.component.html',
})
export class WidgetBuilderComponent implements OnInit {
  @ViewChild(WidgetEditDirective) editForm: WidgetEditDirective;

  private widgets;
  public activeWidget;
  public editingPage;
  public editing;
  public showSidebar = true;

  /**
   * WidgetBuilder constructor.
   * @param dragulaService
   * @param _componentFactoryResolver
   * @param widgetService
   * @param widgetTypeRegistry
   * @param widgetBuilderService
   */
  constructor(private dragulaService: DragulaService, private _componentFactoryResolver: ComponentFactoryResolver, private widgetService: WidgetService, private widgetTypeRegistry: WidgetTypeRegistry, private widgetBuilderService: WidgetBuilderService) {

    // Only allow dragging when using the move span.
    dragulaService.setOptions('widget-container', {
      moves: function (el, container, handle) {
        return handle.classList.contains('drag');
      }
    });

    widgetBuilderService.widgetSelected$.subscribe(
      widget => {
        this.editWidget(widget)
      });
  }

  ngOnInit() {
    this.widgets = this.widgetService.getWidgets();
    this.editingPage = this.widgetService.getWidgetPage('my-page');
  }

  /**
   * Start editing the given widget.
   * @param widget
   */
  public editWidget(widget: Widget) {
    // For POC: build instance here. For end product, instance is build when retrieving the page.
    let widgetInstance = this.widgetTypeRegistry.getInstance(widget);

    this.editing = true;
    this.activeWidget = widgetInstance;

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(widgetInstance.editComponent);
    let viewContainerRef = this.editForm.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<WidgetEditComponent>componentRef.instance).settings = widgetInstance.settings;
  }

  /**
   * Toggle the sidebar.
   */
  public toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

}
