import { Component, Input, OnInit } from '@angular/core';
import { WidgetTypeRegistry } from "../../../core/widget/services/widget-type-registry.service";
import { Region } from "../../../core/layout/region";
import { WidgetBuilderService } from "../../services/widget-builder.service";

/**
 * Component used for adding new widgets to the widget page rows.
 */
@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
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
  public addWidget($event, widgetType: any): void{
    $event.stopWidgetDeselect = true;

    // Get a widget with default settings from the registry
    let widget = this.widgetTypeRegistry.getInstance({
      type: widgetType.type
    });

    this.region.addWidget(widget);

    // Select the widget
    this.widgetBuilderService.selectWidget(widget);
  }

  /**
   * Catch the click on the droptoggle
   * @param $event
   */
  public dropToggleClick($event) {
    $event.stopWidgetDeselect = true;
  }

}
