import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RowLayoutDirective } from '../../directives/row-layout.directive';
import { AbstractLayoutComponent } from "../../../core/layout/components/abstract-layout.component";
import { LayoutTypeRegistry } from "../../../core/layout/services/layout-type-registry.service";
import { Layout } from "../../../core/layout/layout";
import { WidgetBuilderService } from "../../services/widget-builder.service";
import { Widget } from "../../../core/widget/widget";

/**
 * Provides a row preview component.
 */
@Component({
  'selector': 'app-row-preview',
  'templateUrl': './row-preview.component.html'
})
export class RowPreviewComponent implements OnInit, OnDestroy {

  /**
   * The row Layout preview
   */
  @ViewChild(RowLayoutDirective) preview: RowLayoutDirective;

  /**
   * The current row
   */
  @Input() row: Layout;

  /**
   * The rows
   * @type {Array}
   */
  @Input() rows: any = [];

  /**
   * The index of the current row
   */
  @Input() index: number;

  /**
   * The currently active
   */
  public activeWidget: Widget;

  /**
   * Subscription to the widget selected observable
   */
  private widgetSelectedSubscription;

  /**
   * Construct the row preview.
   *
   * @param {ComponentFactoryResolver} _componentFactoryResolver
   * @param layoutTypeRegistry
   * @param widgetBuilderService
   */
  constructor(private _componentFactoryResolver: ComponentFactoryResolver, private layoutTypeRegistry: LayoutTypeRegistry, private widgetBuilderService: WidgetBuilderService) {
    this.widgetSelectedSubscription = widgetBuilderService.widgetSelected$.subscribe(widget => {
      this.activeWidget = widget;
    });
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    let componentType = this.layoutTypeRegistry.getLayoutType(this.row.type);
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType.component);
    let viewContainerRef = this.preview.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AbstractLayoutComponent>componentRef.instance).regions = this.row.regions;
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.widgetSelectedSubscription.unsubscribe();
  }

  /**
   * Handle the row changed event
   * @param change
   */
  public handleRowChanged(change: any) {
    // Stop the widget from being deselected on the original event
    change.originalEvent.stopWidgetDeselect = true;

    if (change.action === 'remove') {
      // If the active widget is in the current row we are removing, deselect it
      for (let regionId in this.row.regions) {
        if (this.row.regions.hasOwnProperty(regionId)) {
          if (this.row.regions[regionId].widgets.indexOf(this.activeWidget) > -1) {
            this.widgetBuilderService.selectWidget();
          }
        }
      }
    }

    // Save the widget page
    this.widgetBuilderService.saveWidgetPage();
  }

}
