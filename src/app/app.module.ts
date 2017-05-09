import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {WidgetRegistry} from 'angular2-schema-form';
import {WidgetSettingsWidget} from './widget-builder/widget-settings.widget';
import {WidgetBuilderModule} from './widget-builder/widget-builder.module';
import {WidgetTypeRegistry} from './shared/services/widget-type-registry.service';
import {SearchFormWidget} from './widgets/search-form-widget/search-form-widget.widget';
import {SearchResultsWidget} from './widgets/search-results-widget/search-results-widget.widget';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WidgetBuilderModule,
    NgbModule.forRoot(),
    NgbDropdownModule
  ],
  bootstrap: [AppComponent],
  providers: [WidgetTypeRegistry]
})

export class AppModule {

  constructor(widgetRegistry: WidgetRegistry, widgetTypeRegistry: WidgetTypeRegistry) {
    widgetRegistry.register('widget-settings', WidgetSettingsWidget);
    widgetTypeRegistry.register('search-form', SearchFormWidget, 'Search form');
    widgetTypeRegistry.register('search-results', SearchResultsWidget, 'Search results');
  }

}