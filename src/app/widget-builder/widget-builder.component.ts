import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { WidgetEditDirective } from './directives/widget-edit.directive';
import { DragulaService } from 'ng2-dragula';
import { WidgetService } from '../widget.service';
import { WidgetBuilderService } from "./services/widget-builder.service";
import { WidgetTypeRegistry } from "../core/widget/services/widget-type-registry.service";
import { Widget } from "app/core/widget/widget";
import { AbstractWidgetEditComponent } from "../core/widget/components/abstract-widget-edit-component";
import * as autoScroll from 'dom-autoscroller';
import { WidgetPage } from "../core/widget/widget-page";

/**
 * The widget builder component is used for editing a widget page.
 */
@Component({
  selector: 'app-widget-builder',
  templateUrl: './widget-builder.component.html',
})
export class WidgetBuilderComponent implements OnInit {

  /**
   * Widget edit form
   */
  @ViewChild(WidgetEditDirective) editForm: WidgetEditDirective;

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
   * Indicatis if the sidebar is being shown or not
   */
  public showSidebar: boolean = true;

  /**
   * View mode of the widget builder (eg. desktop, tablet,..)
   */
  public viewMode: string;

  /**
   * Reference to the dom autoscroller
   */
  public scroll: any;

  /**
   * WidgetBuilder constructor.
   * @param dragulaService
   * @param _componentFactoryResolver
   * @param widgetService
   * @param widgetTypeRegistry
   * @param widgetBuilderService
   */
  constructor(private dragulaService: DragulaService, private _componentFactoryResolver: ComponentFactoryResolver, private widgetService: WidgetService, private widgetTypeRegistry: WidgetTypeRegistry, private widgetBuilderService: WidgetBuilderService) {
    widgetBuilderService.widgetSelected$.subscribe(widget => {
      this.editWidget(widget);
    });

    this.editingPage = this.widgetService.getWidgetPage('my-page');

    // Set the current page on the widget builder service
    this.widgetBuilderService.widgetPage = this.editingPage;
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    // Set the dragula options
    this.dragulaService.setOptions('widget-container', {
      moves: function (el, container, handle) {
        return handle.classList.contains('drag');
      }
    });

    // Get a reference to the widget-container drake
    let drake = this.dragulaService.find('widget-container');

    // Init the autoscroll
    this.scroll = autoScroll(document.querySelector('#widget-builder-preview'), {
      margin: 30,
      maxSpeed: 25,
      scrollWhenOutside: true,

      // Only scroll when drake is dragging
      autoScroll: function () {
        return this.down && drake.drake.dragging;
      }
    });
  }

  /**
   * Start editing the given widget.
   * @param widget
   */
  public editWidget(widget: Widget) {
    this.editing = true;
    this.activeWidget = widget;

    let widgetType = this.widgetTypeRegistry.getWidgetType(widget.type);
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(widgetType.editComponent);

    let viewContainerRef = this.editForm.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AbstractWidgetEditComponent>componentRef.instance).settings = widget.settings;
  }

  /**
   * Toggle the sidebar.
   */
  public toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  /**
   * Change the current view mode
   */
  public handleViewModeChanged(viewMode: string) {
    this.viewMode = viewMode;
  }

}
