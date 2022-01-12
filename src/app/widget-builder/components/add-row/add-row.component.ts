import { Component, Input, OnInit } from '@angular/core';
import { LayoutTypeRegistry } from '../../../core/layout/services/layout-type-registry.service';
import { WidgetPage } from '../../../core/widget/widget-page';
import { WidgetBuilderService } from '../../services/widget-builder.service';

/**
 * Component used for adding new rows to the widget page.
 */
@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
})
export class AddRowComponent implements OnInit {
  /**
   * The Layout types registered in the application
   * @type {Array}
   */
  public layoutTypes = [];

  /**
   * The widget page
   */
  @Input() page: WidgetPage;

  /**
   * AddRowComponent constructor.
   * @param layoutTypeRegistry
   * @param widgetBuilderService
   */
  constructor(
    private layoutTypeRegistry: LayoutTypeRegistry,
    private widgetBuilderService: WidgetBuilderService
  ) {}

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    const keys = Object.keys(this.layoutTypeRegistry.layoutTypes);
    for (const key of keys) {
      this.layoutTypes.push({
        label: this.layoutTypeRegistry.layoutTypes[key].label,
        type: key,
      });
    }
  }

  /**
   * Add a layout to the page.
   * @param $event
   * @param layout
   */
  public addRow($event, layout: any) {
    // Stop the builder from deselecting the active widget
    $event.stopWidgetDeselect = true;

    // Add the row to the page
    const row = this.layoutTypeRegistry.getInstance(layout.type);
    this.page.addRow(row);

    // Save the widget page
    this.widgetBuilderService.saveWidgetPage();
  }

  /**
   * Catch the click on the droptoggle
   * @param $event
   */
  public dropToggleClick($event) {
    $event.stopWidgetDeselect = true;
  }
}
