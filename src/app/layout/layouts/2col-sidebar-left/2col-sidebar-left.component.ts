import { Component } from '@angular/core';
import { WidgetBuilderService } from "../../../widget-builder/services/widget-builder.service";
import { AbstractLayoutComponent } from "../../components/abstract-layout.component";
import { WidgetTypeRegistry } from "../../../widget/services/widget-type-registry.service";

@Component({
  'selector': 'app-2-col-sidebar-left-layout',
  'templateUrl': './2col-sidebar-left.component.html'
})
export class TwoColSidebarLeftComponent extends AbstractLayoutComponent {

  /**
   * Construct the row preview.
   */
  constructor(protected widgetTypeRegistry: WidgetTypeRegistry, protected widgetBuilderService: WidgetBuilderService) {
    super(widgetTypeRegistry, widgetBuilderService);
  }

}
