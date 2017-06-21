import { Component } from '@angular/core';
import { WidgetBuilderService } from "../../../widget-builder/services/widget-builder.service";
import { AbstractLayoutComponent } from "../../components/abstract-layout.component";
import { WidgetTypeRegistry } from "../../../widget/services/widget-type-registry.service";

@Component({
  'selector': 'app-full-width-layout',
  'templateUrl': './full-width.component.html'
})
export class FullWidthRowLayoutComponent extends AbstractLayoutComponent {

  /**
   * Construct the row preview.
   */
  constructor(protected widgetTypeRegistry: WidgetTypeRegistry, protected widgetBuilderService: WidgetBuilderService) {
    super(widgetTypeRegistry, widgetBuilderService);
  }

}
