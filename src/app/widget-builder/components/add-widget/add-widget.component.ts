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

  public widgetTypes = [];

  @Input() region: Region;

  /**
   * AddWidgetComponent constructor.
   * @param widgetTypeRegistry
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
  addWidget($event, widgetType: any): void{
    let widget = this.widgetTypeRegistry.getInstance(widgetType.type, widgetType.settings);
    this.region.addWidget(widget);
    this.widgetBuilderService.selectWidget(widget);
  }

  click($event) {
    $event.stopPropagation();
  }

}
