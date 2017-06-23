import { NgModule } from '@angular/core';
import { LayoutFactory } from "./layout/factories/layout.factory";
import { LayoutTypeRegistry } from "./layout/services/layout-type-registry.service";
import { WidgetTypeRegistry } from "./widget/services/widget-type-registry.service";
import { WidgetPageFactory } from "./widget/factories/widget-page.factory";

@NgModule({
  providers: [
    LayoutFactory,
    LayoutTypeRegistry,
    WidgetTypeRegistry,
    WidgetPageFactory,
  ],
})

export class CoreModule {}
