import { Input, OnInit } from '@angular/core';
import { WidgetBuilderService } from "../../widget-builder/services/widget-builder.service";
import { WidgetTypeRegistry } from "../../widget/services/widget-type-registry.service";
import { Widget } from "../../widget/widget";

export abstract class AbstractLayoutComponent implements OnInit {

  @Input() regions: any;
  public widgetTypes = [];
  public selectedWidget;

  /**
   * Construct the row preview.
   *
   * @param widgetTypeRegistry
   * @param widgetBuilderService
   */
  constructor(protected widgetTypeRegistry: WidgetTypeRegistry, protected widgetBuilderService: WidgetBuilderService) {
    widgetBuilderService.widgetSelected$.subscribe(
      widget => {
        this.selectedWidget = widget
      });

  }

  /**
   * {@inheritDoc}
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
   * Start editing the given widget.
   * @param widget
   */
  public editWidget(widget: Widget) {
    this.widgetBuilderService.selectWidget(widget);
  }

}