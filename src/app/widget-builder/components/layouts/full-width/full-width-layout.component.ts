import { Component } from '@angular/core';
import { WidgetBuilderService } from "../../../services/widget-builder.service";
import { AbstractLayoutComponent } from "../../../../core/layout/components/abstract-layout.component";

@Component({
  'selector': 'app-full-width-layout',
  'templateUrl': './full-width.component.html'
})
export class FullWidthLayoutComponent extends AbstractLayoutComponent {

  /**
   * Construct the row preview.
   */
  constructor(protected widgetBuilderService: WidgetBuilderService) {
    super(widgetBuilderService);
  }

}
