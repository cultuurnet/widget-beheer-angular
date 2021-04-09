import { Component, Input, OnInit } from '@angular/core';
import { WidgetTypeRegistry } from '../../../core/widget/services/widget-type-registry.service';
import { Region } from '../../../core/layout/region';
import { WidgetBuilderService } from '../../services/widget-builder.service';

/**
 * Component used for adding new widgets to the widget page rows.
 */
@Component({
  selector: 'app-add-widget',
  template: './add-widget.component.html',
})
export class AddWidgetComponent implements OnInit {

  /**
   * Available widget types
   */
  public widgetTypes = [];

  /**
   * The region
   */
  @Input() region: Region;

  /**
   * AddWidgetComponent constructor.
   * @param widgetTypeRegistry
   * @param widgetBuilderService
   */
  constructor(private widgetTypeRegistry: WidgetTypeRegistry, private widgetBuilderService: WidgetBuilderService) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    const keys = Object.keys(this.widgetTypeRegistry.widgetTypes);
    for (const key of keys) {
      this.widgetTypes.push({
        label: this.widgetTypeRegistry.widgetTypes[key].label,
        type: key
      });
    }
  }

  /**
   * Add a widget to the region.
   * @param $event
   * @param widgetType
   */
  public addWidget($event: { stopWidgetDeselect: boolean; }, widgetType: any): void {
    $event.stopWidgetDeselect = true;

    // Generate a widget name, then add the widget
    const widgetName = this.widgetBuilderService.generateWidgetName(widgetType);

    // Get a widget with default settings from the registry
    const widget = this.widgetTypeRegistry.getInstance({
      type: widgetType.type,
      name: widgetName,
    });

    this.region.addWidget(widget);

    // Select the widget
    this.widgetBuilderService.selectWidget(widget);

    // Save the widget page
    this.widgetBuilderService.saveWidgetPage(widget.id);
  }

  /**
   * Catch the click on the droptoggle
   * @param $event
   */
  public dropToggleClick($event: { stopWidgetDeselect: boolean; }) {
    $event.stopWidgetDeselect = true;
  }

}
