import { Input } from "@angular/core";
import { WidgetBuilderService } from "../../../widget-builder/services/widget-builder.service";
import { Widget } from "../../widget/widget";

export abstract class AbstractLayoutComponent {

  @Input() regions: any;
  public selectedWidget;

  /**
   * Construct the row preview.
   * @param widgetBuilderService
   */
  constructor(protected widgetBuilderService: WidgetBuilderService) {
    widgetBuilderService.widgetSelected$.subscribe(
      widget => {
        this.selectedWidget = widget
      });

  }

  /**
   * Start editing the given widget.
   * @param widget
   */
  public editWidget(widget: Widget) {
    this.widgetBuilderService.selectWidget(widget);
  }

  /**
   * Remove a widget from the region.
   * @param widget
   */
  public removeWidget(widget: Widget) {
    let widgetpage = this.widgetBuilderService.widgetPage;

    // Loop the rows
    for (let rowKey in widgetpage.rows) {
      if (widgetpage.rows.hasOwnProperty(rowKey)) {

        // Loop the regions
        for (let regionId in widgetpage.rows[rowKey].regions) {
          if (widgetpage.rows[rowKey].regions.hasOwnProperty(regionId)) {
            let index = widgetpage.rows[rowKey].regions[regionId].widgets.indexOf(widget);
            if (index > -1) {
              widgetpage.rows[rowKey].regions[regionId].widgets.splice(index, 1);
            }
          }
        }
      }
    }
  }

}