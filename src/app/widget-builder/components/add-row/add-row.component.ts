import { Component, Input, OnInit } from '@angular/core';
import { LayoutTypeRegistry } from "../../../core/layout/services/layout-type-registry.service";
import { WidgetPage } from "../../../core/widget/widget-page";
import { WidgetBuilderService } from "../../services/widget-builder.service";

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
   * @param layout
   */
  addRow(layout: any): void{
    let row = this.layoutTypeRegistry.getInstance(layout.type);
    this.page.addRow(row);

    // Update row observable
    this.widgetBuilderService.updateWidgetPageRows(row);
  }

}
