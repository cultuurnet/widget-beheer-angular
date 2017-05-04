import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {DragulaModule} from "ng2-dragula";
import {WidgetEditComponent} from "./widget-edit.component";
import {WidgetEditDirective} from "./widget-edit.directive";

import {
  SchemaFormModule,
  DefaultWidgetRegistry,
  WidgetRegistry
} from 'angular2-schema-form';
import {WidgetSettingsWidget} from "./widget-settings.widget";
import {WidgetService} from "./widget.service";

//import {SearchFormWidgetEditComponent} from "./search-form-widget-edit.component";
//import {SearchResultsWidgetEditComponent} from "./search-results-widget-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    WidgetEditComponent,
      WidgetEditDirective,
      WidgetSettingsWidget
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule,
    SchemaFormModule
  ],
  providers: [{provide: WidgetRegistry, useClass: DefaultWidgetRegistry}, WidgetService],
  bootstrap: [AppComponent],
  //entryComponents: [ SearchFormWidgetEditComponent, SearchResultsWidgetEditComponent ]
  entryComponents: [ WidgetEditComponent, WidgetSettingsWidget ]
})

export class AppModule {

  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register('widget-settings', WidgetSettingsWidget);
  }

}
