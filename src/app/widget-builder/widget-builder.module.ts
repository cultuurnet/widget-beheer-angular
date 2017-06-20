
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DragulaModule} from 'ng2-dragula';
import {WidgetEditDirective} from './directives/widget-edit.directive';
import {WidgetService} from 'app/widget.service';
import {SearchFormWidgetEditComponent} from 'app/widgets/search-form-widget/search-form-widget-edit.component';
import {SearchResultsWidgetEditComponent} from 'app/widgets/search-results-widget/search-results-widget-edit.component';
import { WidgetBuilderComponent } from './widget-builder.component';
import {CommonModule} from '@angular/common';
import {AddWidgetComponent} from './components/add-widget/add-widget.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {RowPreviewComponent} from './components/row-preview/row-preview.component';
import {RowLayoutDirective} from 'app/widget-builder/directives/row-layout.directive';
import {TwoColSidebarLeftComponent} from '../layouts/2col-sidebar-left/2col-sidebar-left.component';
import {FullWidthRowLayoutComponent} from "../layouts/full-width/full-width.component";
import {WidgetBuilderService} from "./services/widget-builder.service";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [
        WidgetEditDirective,
        RowLayoutDirective,
        SearchFormWidgetEditComponent,
        SearchResultsWidgetEditComponent,
        WidgetBuilderComponent,
        AddWidgetComponent,
        RowPreviewComponent,
        TwoColSidebarLeftComponent,
        FullWidthRowLayoutComponent,
    ],
    exports: [
        WidgetBuilderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DragulaModule,
        NgbDropdownModule,
        TranslateModule,
    ],
    providers: [WidgetService, WidgetBuilderService],
    entryComponents: [SearchFormWidgetEditComponent, SearchResultsWidgetEditComponent, TwoColSidebarLeftComponent]
})

export class WidgetBuilderModule {}
