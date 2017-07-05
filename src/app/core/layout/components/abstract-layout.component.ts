import { Input } from "@angular/core";
import { WidgetBuilderService } from "../../../widget-builder/services/widget-builder.service";
import { Widget } from "../../widget/widget";

export abstract class AbstractLayoutComponent {

  /**
   * The Layout regions
   */
  @Input() regions: any;

  /**
   * The selected widget
   */
  public selectedWidget: Widget;

  /**
   * Construct the row preview.
   * @param widgetBuilderService
   */
  constructor(protected widgetBuilderService: WidgetBuilderService) {
    widgetBuilderService.widgetSelected$.subscribe(widget => {
        this.selectedWidget = widget
    });
  }

}