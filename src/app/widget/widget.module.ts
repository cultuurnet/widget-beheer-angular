import { NgModule } from '@angular/core';
import { WidgetTypeRegistry } from "./services/widget-type-registry.service";
import { WidgetPageFactory } from "./factories/widget-page.factory";

@NgModule({
  providers: [WidgetTypeRegistry, WidgetPageFactory],
})

export class WidgetModule {}
