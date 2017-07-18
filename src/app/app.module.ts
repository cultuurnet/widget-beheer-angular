import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Http, HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { WidgetBuilderModule } from "./widget-builder/widget-builder.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
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
import { SearchFormWidgetEditComponent } from "./widget-builder/components/widgets/search-form-widget/search-form-widget-edit.component";
import { SearchResultsWidgetEditComponent } from "./widget-builder/components/widgets/search-results-widget/search-results-widget-edit.component";
import { TwoColSidebarRightayout } from "./core/layout/layouts/2col-sidebar-right/2col-sidebar-right.layout";
import { TwoColSidebarRightLayoutComponent } from "./widget-builder/components/layouts/2col-sidebar-right/2col-sidebar-right-layout.component";
import { ThreeColDoubleSidebarLayout } from "./core/layout/layouts/3col-double-sidebar/3col-double-sidebar.layout";
import { ThreeColDoubleSidebarLayoutComponent } from "./widget-builder/components/layouts/3col-double-sidebar/3col-double-sidebar-layout.component";
import { PageTemplateRegistry } from "./core/template/services/page-template-registry.service";
import { MyTemplate } from "./core/template/page-templates/my-template";
import { WidgetService } from "./core/widget/services/widget.service";
import { HtmlWidget } from "./core/widget/widgets/html-widget/html-widget.widget";
import { HtmlWidgetWidgetEditComponent } from "./widget-builder/components/widgets/html-widget/html-widget-edit.component";

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
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent],
})

export class AppModule {

  /**
   * AppModule constructor.
   * @param widgetTypeRegistry
   * @param layoutTypeRegistry
   * @param pageTemplateRegistry
   */
  constructor(private widgetTypeRegistry: WidgetTypeRegistry, private layoutTypeRegistry: LayoutTypeRegistry, private pageTemplateRegistry: PageTemplateRegistry) {
    // Register widget types
    widgetTypeRegistry.register('search-form', 'Search form', SearchFormWidget, SearchFormWidgetEditComponent);
    widgetTypeRegistry.register('search-results', 'Search results', SearchResultsWidget, SearchResultsWidgetEditComponent);
    widgetTypeRegistry.register('html', 'HTML', HtmlWidget, HtmlWidgetWidgetEditComponent);

    // Register layouts
    layoutTypeRegistry.register('2col-sidebar-left', 'Two col sidebar left', TwoColSidebarLeftLayout, TwoColSidebarLeftLayoutComponent);
    layoutTypeRegistry.register('2col-sidebar-right', 'Two col sidebar right', TwoColSidebarRightayout, TwoColSidebarRightLayoutComponent);
    layoutTypeRegistry.register('3col-double-sidebar', 'Three col double sidebar', ThreeColDoubleSidebarLayout, ThreeColDoubleSidebarLayoutComponent);
    layoutTypeRegistry.register('full-width', 'Full width', FullWidthLayout, FullWidthLayoutComponent);

    // Register page templates
    pageTemplateRegistry.register('my-template', new MyTemplate());

    // Invoke the afterInit method
    this.afterInit();
  }

  /**
   * Tasks to be run after the app has initialized
   */
  private afterInit() {
    this.widgetTypeRegistry.loadWidgetDefaultSettings();
  }

}
