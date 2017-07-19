import { NgModule } from '@angular/core';
import { LayoutFactory } from "./layout/factories/layout.factory";
import { LayoutTypeRegistry } from "./layout/services/layout-type-registry.service";
import { WidgetTypeRegistry } from "./widget/services/widget-type-registry.service";
import { WidgetPageFactory } from "./widget/factories/widget-page.factory";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "./modal/components/confirmation-modal.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";
import { Http, RequestOptions } from "@angular/http";
import { PageTemplateRegistry } from "./template/services/page-template-registry.service";
import { WidgetService } from "./widget/services/widget.service";
import { ApiRequestOptions } from "./api-request-options";

@NgModule({
  providers: [
    LayoutFactory,
    LayoutTypeRegistry,
    PageTemplateRegistry,
    WidgetPageFactory,
    WidgetService,
    WidgetTypeRegistry,
    { provide: RequestOptions, useClass: ApiRequestOptions }
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
