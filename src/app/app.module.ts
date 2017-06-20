import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Http, HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { WidgetBuilderModule } from "./widget-builder/widget-builder.module";
import { WidgetTypeRegistry } from "./shared/services/widget-type-registry.service";
import { SearchFormWidget } from "./widgets/search-form-widget/search-form-widget.widget";
import { SearchResultsWidget } from "./widgets/search-results-widget/search-results-widget.widget";
import { NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { PageTemplateRegistry } from "./shared/services/page-template-registry.service";
import { MyTemplate } from "./page-templates/my-template";

/**
 * AoT requires an exported function for factories
 */
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    WidgetBuilderModule,
    NgbModule.forRoot(),
    NgbDropdownModule
  ],
  bootstrap: [AppComponent],
  providers: [WidgetTypeRegistry, PageTemplateRegistry]
})

export class AppModule {

  constructor(widgetTypeRegistry: WidgetTypeRegistry, pageTemplateRegistry: PageTemplateRegistry) {
    // Register widget types
    widgetTypeRegistry.register('search-form', SearchFormWidget, 'Search form');
    widgetTypeRegistry.register('search-results', SearchResultsWidget, 'Search results');

    // Register page templates
    pageTemplateRegistry.register('my-template', MyTemplate);
  }

}