import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WidgetBuilderModule } from './widget-builder/widget-builder.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WidgetTypeRegistry } from './core/widget/services/widget-type-registry.service';
import { LayoutTypeRegistry } from './core/layout/services/layout-type-registry.service';
import { SearchFormWidget } from './core/widget/widgets/search-form-widget/search-form-widget.widget';
import { SearchResultsWidget } from './core/widget/widgets/search-results-widget/search-results-widget.widget';
import { TwoColSidebarLeftLayout } from './core/layout/layouts/2col-sidebar-left/2col-sidebar-left.layout';
import { TwoColSidebarLeftLayoutComponent } from './widget-builder/components/layouts/2col-sidebar-left/2col-sidebar-left-layout.component';
import { CoreModule } from './core/core.module';
import { SearchFormWidgetEditComponent } from './widget-builder/components/widgets/search-form-widget/search-form-widget-edit.component';
import { SearchResultsWidgetEditComponent } from './widget-builder/components/widgets/search-results-widget/search-results-widget-edit.component';
import { TwoColSidebarRightayout } from './core/layout/layouts/2col-sidebar-right/2col-sidebar-right.layout';
import { TwoColSidebarRightLayoutComponent } from './widget-builder/components/layouts/2col-sidebar-right/2col-sidebar-right-layout.component';
import { ThreeColDoubleSidebarLayout } from './core/layout/layouts/3col-double-sidebar/3col-double-sidebar.layout';
import { ThreeColDoubleSidebarLayoutComponent } from './widget-builder/components/layouts/3col-double-sidebar/3col-double-sidebar-layout.component';
import { ThreeColTrippleLayout } from './core/layout/layouts/3col-tripple/3col-tripple.layout';
import { ThreeColTrippleLayoutComponent } from './widget-builder/components/layouts/3col-tripple/3col-tripple-layout.component';
import { PageTemplateRegistry } from './core/template/services/page-template-registry.service';
import { EmptyPageTemplate } from './core/template/page-templates/empty-page-template';
import { HtmlWidget } from './core/widget/widgets/html-widget/html-widget.widget';
import { HtmlWidgetWidgetEditComponent } from './widget-builder/components/widgets/html-widget/html-widget-edit.component';
import { OneCollLayout } from './core/layout/layouts/one-col/one-col.layout';
import { OneColLayoutComponent } from './widget-builder/components/layouts/one-col/one-col-layout.component';
import { TipsWidget } from './core/widget/widgets/tips-widget/tips-widget.widget';
import { TipsWidgetWidgetEditComponent } from './widget-builder/components/widgets/tips-widget/tips-widget-edit.component';
import { FacetsWidget } from './core/widget/widgets/facets-widget/facets-widget.widget';
import { FacetsWidgetWidgetEditComponent } from './widget-builder/components/widgets/facets-widget/facets-widget-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { AgendaPageTemplate } from './core/template/page-templates/agenda-page-template';
import { TipsPageTemplate } from './core/template/page-templates/tips-page-template';
import { UitPasPageTemplate } from './core/template/page-templates/uitpas-page-template';
import { WidgetService } from './core/widget/services/widget.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastyConfig, ToastyModule } from 'ng2-toasty';
import { ProjectNoAccessComponent } from './core/route/components/project-no-access.component';

/**
 * AoT requires an exported function for factories
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CoreModule,
    WidgetBuilderModule,
    AppRoutingModule,
    NgbModule,
    ToastyModule.forRoot()
  ],
  exports: [
    TranslateModule
  ],
  bootstrap: [AppComponent],
})

export class AppModule {

  /**
   * AppModule constructor.
   * @param widgetTypeRegistry
   * @param widgetService
   * @param layoutTypeRegistry
   * @param pageTemplateRegistry
   * @param toastyConfig
   */
  constructor(
    private widgetTypeRegistry: WidgetTypeRegistry,
    private widgetService: WidgetService,
    private layoutTypeRegistry: LayoutTypeRegistry,
    private pageTemplateRegistry: PageTemplateRegistry,
    private toastyConfig: ToastyConfig
  ) {
    // Register widget types
    widgetTypeRegistry.register('search-form', 'Search form', SearchFormWidget, SearchFormWidgetEditComponent);
    widgetTypeRegistry.register('search-results', 'Search results', SearchResultsWidget, SearchResultsWidgetEditComponent);
    widgetTypeRegistry.register('facets', 'Facets', FacetsWidget, FacetsWidgetWidgetEditComponent);
    widgetTypeRegistry.register('html', 'HTML', HtmlWidget, HtmlWidgetWidgetEditComponent);
    widgetTypeRegistry.register('tips', 'Tips', TipsWidget, TipsWidgetWidgetEditComponent);

    // Register layouts
    layoutTypeRegistry.register('one-col', 'Full width', OneCollLayout, OneColLayoutComponent);
    layoutTypeRegistry.register('2col-sidebar-left', 'Two col sidebar left', TwoColSidebarLeftLayout, TwoColSidebarLeftLayoutComponent);
    layoutTypeRegistry.register('2col-sidebar-right', 'Two col sidebar right', TwoColSidebarRightayout, TwoColSidebarRightLayoutComponent);
    layoutTypeRegistry.register('3col-double-sidebar', 'Three col double sidebar', ThreeColDoubleSidebarLayout, ThreeColDoubleSidebarLayoutComponent);
    layoutTypeRegistry.register('3col-tripple', 'Three col tripple', ThreeColTrippleLayout, ThreeColTrippleLayoutComponent);

    // Register page templates
    pageTemplateRegistry.register('empty', new EmptyPageTemplate());
    pageTemplateRegistry.register('agenda', new AgendaPageTemplate());
    pageTemplateRegistry.register('tips', new TipsPageTemplate());
    pageTemplateRegistry.register('uitpas', new UitPasPageTemplate());

    // Invoke the afterInit method
    this.afterInit();
  }

  /**
   * Tasks to be run after the app has initialized
   */
  private afterInit() {
    this.setToastyDefaultSettings();
    this.loadWidgetDefaultSettings();
  }

  /**
   * Set the toasty (growl) default settings
   */
  private setToastyDefaultSettings() {
    this.toastyConfig.timeout = 5000;
    this.toastyConfig.position = 'top-right';
  }

  /**
   * Load the widget default settings onto the registered widgets
   */
  private loadWidgetDefaultSettings() {
    this.widgetService.getWidgetDefaultSettings().subscribe(
      defaultSettings => {
        for (const widgetType in defaultSettings) {
          if (defaultSettings.hasOwnProperty(widgetType) &&  this.widgetTypeRegistry.widgetTypes.hasOwnProperty(widgetType)) {
            this.widgetTypeRegistry.widgetTypes[widgetType].defaultSettings = defaultSettings[widgetType];
          }
        }
      },
    );
  }

}
