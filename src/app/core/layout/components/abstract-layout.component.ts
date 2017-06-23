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

}