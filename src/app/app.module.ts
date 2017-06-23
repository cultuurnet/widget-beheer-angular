import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Http, HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { WidgetBuilderModule } from "./widget-builder/widget-builder.module";
import { NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { WidgetTypeRegistry } from "./core/widget/services/widget-type-registry.service";
import { LayoutTypeRegistry } from "./core/layout/services/layout-type-registry.service";
import { SearchFormWidget } from "./core/widget/widgets/search-form-widget/search-form-widget.widget";
import { SearchResultsWidget } from "./core/widget/widgets/search-results-widget/search-results-widget.widget";
import { TwoColSidebarLeftLayout } from "./core/layout/layouts/2col-sidebar-left/2col-sidebar-left.layout";
import { TwoColSidebarLeftLayoutComponent } from "./widget-builder/components/layouts/2col-sidebar-left/2col-sidebar-left-layout.component";
import { FullWidthLayoutComponent } from "./widget-builder/components/layouts/full-width/full-width-layout.component";
import { FullWidthLayout } from "./core/layout/layouts/full-width/full-width.layout";
import { CoreModule } from "./core/core.module";

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
    CoreModule,
    WidgetBuilderModule,
    NgbModule.forRoot(),
    NgbDropdownModule
  ],
  bootstrap: [AppComponent],
})

export class AppModule {

  constructor(widgetTypeRegistry: WidgetTypeRegistry, layoutTypeRegistry: LayoutTypeRegistry) {
    widgetTypeRegistry.register('search-form', SearchFormWidget, 'Search form');
    widgetTypeRegistry.register('search-results', SearchResultsWidget, 'Search results');

    // Register layouts
    layoutTypeRegistry.register('2col-sidebar-left', TwoColSidebarLeftLayout, TwoColSidebarLeftLayoutComponent);
    layoutTypeRegistry.register('full-width', FullWidthLayout, FullWidthLayoutComponent);
  }

}