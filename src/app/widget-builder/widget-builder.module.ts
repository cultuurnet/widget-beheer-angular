import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { WidgetEditDirective } from './directives/widget-edit.directive';
import { WidgetBuilderComponent } from './widget-builder.component';
import { CommonModule } from '@angular/common';
import { AddWidgetComponent } from './components/add-widget/add-widget.component';
import { NgbAccordionModule, NgbDropdownModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { RowPreviewComponent } from './components/row-preview/row-preview.component';
import { RowLayoutDirective } from 'app/widget-builder/directives/row-layout.directive';
import { WidgetBuilderService } from './services/widget-builder.service';
import { TranslateModule } from '@ngx-translate/core';
import { TwoColSidebarLeftLayoutComponent } from './components/layouts/2col-sidebar-left/2col-sidebar-left-layout.component';
import { SearchFormWidgetEditComponent } from './components/widgets/search-form-widget/search-form-widget-edit.component';
import { SearchResultsWidgetEditComponent } from 'app/widget-builder/components/widgets/search-results-widget/search-results-widget-edit.component';
import { TwoColSidebarRightLayoutComponent } from './components/layouts/2col-sidebar-right/2col-sidebar-right-layout.component';
import { ThreeColDoubleSidebarLayoutComponent } from './components/layouts/3col-double-sidebar/3col-double-sidebar-layout.component';
import { ThreeColTrippleLayoutComponent } from './components/layouts/3col-tripple/3col-tripple-layout.component';
import { AddRowComponent } from './components/add-row/add-row.component';
import { RowEditComponent } from './components/row-edit/row-edit.component';
import { WidgetPreviewComponent } from './components/widgets/widget-preview.component';
import { WidgetGroupFiltersEditComponent } from './components/widgets/group-filters/widget-group-filters-edit.component';
import { WidgetFacilityFiltersEditComponent } from './components/widgets/facility-filters/widget-facility-filters-edit.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { HtmlWidgetWidgetEditComponent } from './components/widgets/html-widget/html-widget-edit.component';
import { OneColLayoutComponent } from './components/layouts/one-col/one-col-layout.component';
import { TipsWidgetWidgetEditComponent } from './components/widgets/tips-widget/tips-widget-edit.component';
import { FacetsWidgetWidgetEditComponent } from './components/widgets/facets-widget/facets-widget-edit.component';
import { WidgetBuilderRoutingModule } from './widget-builder-routing.module';
import { AddPageComponent } from './components/add-page/add-page.component';
import { TemplatePreviewModalComponent } from './components/add-page/preview/template-preview-modal.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { CoreModule } from '../core/core.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AdminPageModalComponent } from './components/modal/admin-page-modal.component';
import { PublishPageConfirmationModalComponent } from './components/modal/publish-page-confirmation-modal.component';
import { JsonEditComponent } from './components/json-edit/json-edit.component';
import { JsonEditModalComponent } from './components/json-edit/json-edit-modal.component';
import { CssEditModalComponent } from './components/css-edit/css-edit-modal.component';
import { RevertWidgetPageComponent } from './components/revert-widgetpage/revert-widget-page.component';

@NgModule({
  declarations: [
    WidgetEditDirective,
    RowLayoutDirective,
    SearchFormWidgetEditComponent,
    SearchResultsWidgetEditComponent,
    WidgetBuilderComponent,
    AddWidgetComponent,
    AddRowComponent,
    RowPreviewComponent,
    RowEditComponent,
    OneColLayoutComponent,
    TwoColSidebarLeftLayoutComponent,
    TwoColSidebarRightLayoutComponent,
    ThreeColDoubleSidebarLayoutComponent,
    ThreeColTrippleLayoutComponent,
    WidgetPreviewComponent,
    WidgetGroupFiltersEditComponent,
    WidgetFacilityFiltersEditComponent,
    HtmlWidgetWidgetEditComponent,
    TipsWidgetWidgetEditComponent,
    FacetsWidgetWidgetEditComponent,
    AddPageComponent,
    TemplatePreviewModalComponent,
    PageListComponent,
    ToolbarComponent,
    AdminPageModalComponent,
    PublishPageConfirmationModalComponent,
    JsonEditComponent,
    JsonEditModalComponent,
    RevertWidgetPageComponent,
    CssEditModalComponent
  ],
  exports: [
    WidgetBuilderComponent
  ],
  imports: [
    CoreModule,
    WidgetBuilderRoutingModule,
    CoreModule,
    CommonModule,
    FormsModule,
    DragulaModule,
    NgbDropdownModule,
    TranslateModule,
    NgbAccordionModule,
    NgbTabsetModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [WidgetBuilderService],
  entryComponents: [
    SearchFormWidgetEditComponent,
    SearchResultsWidgetEditComponent,
    TwoColSidebarLeftLayoutComponent,
    TwoColSidebarRightLayoutComponent,
    ThreeColDoubleSidebarLayoutComponent,
    ThreeColTrippleLayoutComponent,
    OneColLayoutComponent,
    WidgetPreviewComponent,
    WidgetGroupFiltersEditComponent,
    WidgetFacilityFiltersEditComponent,
    HtmlWidgetWidgetEditComponent,
    TipsWidgetWidgetEditComponent,
    FacetsWidgetWidgetEditComponent,
    TemplatePreviewModalComponent,
    ToolbarComponent,
    PublishPageConfirmationModalComponent,
    JsonEditModalComponent,
    CssEditModalComponent,
    AdminPageModalComponent
  ]
})

export class WidgetBuilderModule {
}
