import { NgModule } from '@angular/core';
import { LayoutFactory } from "./layout/factories/layout.factory";
import { LayoutTypeRegistry } from "./layout/services/layout-type-registry.service";
import { WidgetTypeRegistry } from "./widget/services/widget-type-registry.service";
import { WidgetPageFactory } from "./widget/factories/widget-page.factory";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "./modal/components/confirmation-modal.component";

@NgModule({
  providers: [
    LayoutFactory,
    LayoutTypeRegistry,
    WidgetTypeRegistry,
    WidgetPageFactory
  ],
  imports: [
    NgbModalModule
  ],
  exports: [
    ConfirmationModalComponent
  ],
  declarations: [
    ConfirmationModalComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
  ]
})

export class CoreModule {}
