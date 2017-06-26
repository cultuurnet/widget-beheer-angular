import { Component, Input, OnInit } from '@angular/core';
import { LayoutTypeRegistry } from "../../../core/layout/services/layout-type-registry.service";
import { WidgetPage } from "../../../core/widget/widget-page";

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
  constructor(private layoutTypeRegistry: LayoutTypeRegistry) {
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
    this.page.addRow(this.layoutTypeRegistry.getInstance(layout.type));
  }

}
