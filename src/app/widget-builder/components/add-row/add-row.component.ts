import { Component, Input, OnInit } from '@angular/core';
import { LayoutTypeRegistry } from "../../../core/layout/services/layout-type-registry.service";
import { WidgetPage } from "../../../core/widget/widget-page";
import { WidgetBuilderService } from "../../services/widget-builder.service";

/**
 * Component used for adding new rows to the widget page.
 */
@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
})
export class AddRowComponent implements OnInit {

  public layoutTypes = [];
  @Input() page: WidgetPage;

  /**
   * AddRowComponent constructor.
   * @param layoutTypeRegistry
   * @param widgetBuilderService
   */
  constructor(private layoutTypeRegistry: LayoutTypeRegistry, private widgetBuilderService: WidgetBuilderService) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    const keys = Object.keys(this.layoutTypeRegistry.layoutTypes);
    for (const key of keys) {
      this.layoutTypes.push({
        label: this.layoutTypeRegistry.layoutTypes[key].label,
        type: key
      });
    }
  }

  /**
   * Add a layout to the page.
   * @param $event
   * @param layout
   */
  addRow($event, layout: any): void{
    // Stop the builder from deselecting the active widget
    $event.stopWidgetDeselect = true;

    // Add the row to the page
    let row = this.layoutTypeRegistry.getInstance(layout.type);
    this.page.addRow(row);

    // Update row observable
    this.widgetBuilderService.updateWidgetPageRows(row);
  }

  /**
   * Catch the click on the droptoggle
   * @param $event
   */
  public dropToggleClick($event) {
    $event.stopWidgetDeselect = true;
  }

}