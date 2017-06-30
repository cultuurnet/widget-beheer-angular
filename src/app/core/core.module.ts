import { NgModule } from '@angular/core';
import { LayoutFactory } from "./layout/factories/layout.factory";
import { LayoutTypeRegistry } from "./layout/services/layout-type-registry.service";
import { WidgetTypeRegistry } from "./widget/services/widget-type-registry.service";
import { WidgetPageFactory } from "./widget/factories/widget-page.factory";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "./modal/components/confirmation-modal.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";
import { Http } from "@angular/http";

@NgModule({
  providers: [
    LayoutFactory,
    LayoutTypeRegistry,
    WidgetTypeRegistry,
    WidgetPageFactory
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
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
