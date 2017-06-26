import { Component } from '@angular/core';
import { WidgetBuilderService } from "../../../services/widget-builder.service";
import { AbstractLayoutComponent } from "../../../../core/layout/components/abstract-layout.component";

@Component({
  'selector': 'app-2-col-sidebar-right-layout',
  'templateUrl': './2col-sidebar-right.component.html'
})
export class TwoColSidebarRightLayoutComponent extends AbstractLayoutComponent {

  /**
   * Construct the row preview.
   */
  constructor(protected widgetBuilderService: WidgetBuilderService) {
    super(widgetBuilderService);
  }

}
