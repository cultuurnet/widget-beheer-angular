import { NgModule } from '@angular/core';
import { LayoutFactory } from './layout/factories/layout.factory';
import { LayoutTypeRegistry } from './layout/services/layout-type-registry.service';
import { WidgetPageFactory } from './widget/factories/widget-page.factory';
import { WidgetService } from './widget/services/widget.service';
import { WidgetTypeRegistry } from './widget/services/widget-type-registry.service';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './modal/components/confirmation-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { PageTemplateRegistry } from './template/services/page-template-registry.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ApiRequestInterceptor } from './api-request-interceptor';
import { ProjectService } from './project/services/project.service';
import { ProjectResolver } from './route/resolver/project-resolver.service';
import { WidgetPageResolver } from './route/resolver/widget-page-resolver.service';
import { ClipboardModule } from 'ngx-clipboard';
import { ClipboardButtonComponent } from './clipboard/clipboard-button.component';
import { UserService } from './user/services/user.service';
import { AuthGuard } from './route/guard/auth-guard.service';
import { TopbarComponent } from './topbar/components/topbar.component';
import { TopbarService } from './topbar/services/topbar.service';
import { DynamicComponentDirective } from './topbar/directives/dynamic-component.directive';
import { SafeHTMLPipe } from './safe-html.pipe';
import { MemoryCache } from './memory-cache';

@NgModule({
  providers: [
    LayoutFactory,
    LayoutTypeRegistry,
    PageTemplateRegistry,
    WidgetPageFactory,
    MemoryCache,
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
    WidgetPageResolver,
    AuthGuard,
    TopbarService
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbModalModule,
    TranslateModule,
    ClipboardModule
  ],
  exports: [
    ConfirmationModalComponent,
    ClipboardButtonComponent,
    TopbarComponent,
    SafeHTMLPipe
  ],
  declarations: [
    ConfirmationModalComponent,
    ClipboardButtonComponent,
    TopbarComponent,
    DynamicComponentDirective,
    SafeHTMLPipe
  ],
  entryComponents: [
    ConfirmationModalComponent
  ]
})

export class CoreModule {}
