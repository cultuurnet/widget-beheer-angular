
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DragulaModule} from 'ng2-dragula';
import {WidgetEditDirective} from './widget-edit.directive';
import {
    SchemaFormModule,
    DefaultWidgetRegistry,
    WidgetRegistry
} from 'angular2-schema-form';
import {WidgetService} from 'app/widget.service';
import {SearchFormWidgetEditComponent} from 'app/widgets/search-form-widget/search-form-widget-edit.component';
import {SearchResultsWidgetEditComponent} from 'app/widgets/search-results-widget/search-results-widget-edit.component';
import {WidgetSettingsWidget} from './widget-settings.widget';
import { WidgetBuilderComponent } from './widget-builder.component';
import {CommonModule} from '@angular/common';
import {AddWidgetComponent} from './components/add-widget/add-widget.component';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        WidgetEditDirective,
        WidgetSettingsWidget,
        SearchFormWidgetEditComponent,
        SearchResultsWidgetEditComponent,
        WidgetBuilderComponent,
        AddWidgetComponent
    ],
    exports: [
        WidgetBuilderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DragulaModule,
        SchemaFormModule,
        NgbDropdownModule
    ],
    providers: [{provide: WidgetRegistry, useClass: DefaultWidgetRegistry}, WidgetService],
    entryComponents: [SearchFormWidgetEditComponent, SearchResultsWidgetEditComponent, WidgetSettingsWidget]
})

export class WidgetBuilderModule {

    constructor(widgetRegistry: WidgetRegistry) {
        console.log('tst');
        widgetRegistry.register('widget-settings', WidgetSettingsWidget);
    }

}
