import { NgModule } from '@angular/core';
import { LayoutFactory } from "./layout/factories/layout.factory";
import { LayoutTypeRegistry } from "./layout/services/layout-type-registry.service";
import { WidgetPageFactory } from "./widget/factories/widget-page.factory";
import { WidgetService } from "./widget/services/widget.service";
import { WidgetTypeRegistry } from "./widget/services/widget-type-registry.service";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "./modal/components/confirmation-modal.component";
import { TranslateModule } from "@ngx-translate/core";
import { PageTemplateRegistry } from "./template/services/page-template-registry.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { ApiRequestInterceptor } from "./api-request-interceptor";
import { StaticCache } from "./static-cache";
import { ProjectService } from "./project/services/project.service";
import { ProjectResolver } from "./route/resolver/project-resolver.service";
import { WidgetPageResolver } from "./route/resolver/widget-page-resolver.service";
import { ClipboardModule } from 'ngx-clipboard';
import { ClipboardButtonComponent } from "./clipboard/clipboard-button.component";
import { UserService } from "./user/services/user.service";

@NgModule({
  providers: [
    LayoutFactory,
    LayoutTypeRegistry,
    PageTemplateRegistry,
    WidgetPageFactory,
    StaticCache,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiRequestInterceptor,
      multi: true,
    },
    UserService,
    WidgetService,
    ProjectService,
    WidgetTypeRegistry,
    ProjectResolver,
    WidgetPageResolver
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModalModule,
    TranslateModule,
    ClipboardModule
  ],
  exports: [
    ConfirmationModalComponent,
    ClipboardButtonComponent
  ],
  declarations: [
    ConfirmationModalComponent,
    ClipboardButtonComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
  ]
})

export class CoreModule {}
