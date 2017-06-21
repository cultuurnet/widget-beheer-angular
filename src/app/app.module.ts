import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Http, HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { WidgetBuilderModule } from "./widget-builder/widget-builder.module";
import { NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LayoutModule } from "./layout/layout.module";
import { WidgetTypeRegistry } from "./widget/services/widget-type-registry.service";
import { SearchFormWidget } from "./widget/widgets/search-form-widget/search-form-widget.widget";
import { SearchResultsWidget } from "./widget/widgets/search-results-widget/search-results-widget.widget";
import { WidgetModule } from "./widget/widget.module";

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
    WidgetModule,
    WidgetBuilderModule,
    LayoutModule,
    NgbModule.forRoot(),
    NgbDropdownModule
  ],
  bootstrap: [AppComponent],
})

export class AppModule {

  constructor(widgetTypeRegistry: WidgetTypeRegistry) {
    widgetTypeRegistry.register('search-form', SearchFormWidget, 'Search form');
    widgetTypeRegistry.register('search-results', SearchResultsWidget, 'Search results');
  }

}