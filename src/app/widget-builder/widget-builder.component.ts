import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WidgetEditDirective } from './directives/widget-edit.directive';
import { DragulaService } from 'ng2-dragula';
import { WidgetBuilderService } from "./services/widget-builder.service";
import { WidgetTypeRegistry } from "../core/widget/services/widget-type-registry.service";
import { Widget } from "app/core/widget/widget";
import { AbstractWidgetEditComponent } from "../core/widget/components/abstract-widget-edit-component";
import * as autoScroll from 'dom-autoscroller';
import { WidgetPage } from "../core/widget/widget-page";
import { WidgetPageFactory } from "../core/widget/factories/widget-page.factory";
import { Config } from "../config";
import { Subscription } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { WidgetService } from "../core/widget/services/widget.service";

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
   * Indicates the sidebar is being shown or not
   */
  public showSidebar: boolean = true;

  /**
   * View mode of the widget builder (eg. desktop, tablet,..)
   */
  public viewMode: string;

  /**
   * Reference to dom-autoscroller
   */
  public scroll: any;

  /**
   * Subscription to the widget selected observable
   */
  private widgetSelectedSubscription: Subscription;

  /**
   * The dragula container name
   */
  private dragulaContainer = 'widget-container';

  /**
   * WidgetBuilder constructor.
   * @param dragulaService
   * @param _componentFactoryResolver
   * @param widgetTypeRegistry
   * @param widgetBuilderService
   * @param route
   */
  constructor(
    private dragulaService: DragulaService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private widgetTypeRegistry: WidgetTypeRegistry,
    private widgetBuilderService: WidgetBuilderService,
    private route: ActivatedRoute
  ) {
    this.widgetSelectedSubscription = widgetBuilderService.widgetSelected$.subscribe(widget => {
      this.editWidget(widget);
    });
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { project: any, widgetPage: WidgetPage }) => {
      console.log(data.widgetPage);
        this.editingPage = data.widgetPage;

        // Set the current page on the widget builder service
        this.widgetBuilderService.widgetPage = this.editingPage;
      });

    // Set the dragula options
    this.dragulaService.setOptions(this.dragulaContainer, {
      moves: function (el, container, handle) {
        return handle.classList.contains('drag');
      }
    });

    // Get a reference to the widget-container drake
    let drake = this.dragulaService.find(this.dragulaContainer);

    // Keep a reference to the dom-autoscroller
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
   * @inheritDoc
   */
  ngOnDestroy() {
    this.widgetSelectedSubscription.unsubscribe();

    // Destroy the dragula container
    this.dragulaService.destroy(this.dragulaContainer);
  }

  /**
   * Start editing the given widget.
   * @param widget
   */
  public editWidget(widget?: Widget) {
    this.activeWidget = widget;

    let viewContainerRef = this.editForm.viewContainerRef;
    viewContainerRef.clear();

    // Render the widget edit component
    if (widget) {
      let widgetType = this.widgetTypeRegistry.getWidgetType(widget.type);
      let componentFactory = this._componentFactoryResolver.resolveComponentFactory(widgetType.editComponent);

      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<AbstractWidgetEditComponent>componentRef.instance).widget = widget;
    }
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

}
