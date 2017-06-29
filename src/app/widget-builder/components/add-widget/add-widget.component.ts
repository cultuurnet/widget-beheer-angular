import { Component, Input, OnInit } from '@angular/core';
import { WidgetTypeRegistry } from "../../../core/widget/services/widget-type-registry.service";
import { Region } from "../../../core/layout/region";

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
  constructor(private widgetTypeRegistry: WidgetTypeRegistry) {
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
   * @param widget
   */
  addWidget(widget: any): void{
    this.region.addWidget(this.widgetTypeRegistry.getInstance(widget.type, widget.settings));
  }

}
