import { Component } from '@angular/core';
import { WidgetBuilderService } from "../../../services/widget-builder.service";
import { AbstractLayoutComponent } from "../../../../core/layout/components/abstract-layout.component";

/**
 * Provides a two col with sidebar left layout component.
 */
@Component({
  'selector': 'app-2-col-sidebar-left-layout',
  'templateUrl': './2col-sidebar-left.component.html',
})
export class TwoColSidebarLeftLayoutComponent extends AbstractLayoutComponent {

  /**
   * Construct the row preview.
   */
  constructor(protected widgetBuilderService: WidgetBuilderService) {
    super(widgetBuilderService);
  }

}
