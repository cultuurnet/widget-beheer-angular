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
import { AddRowComponent } from './components/add-row/add-row.component';
import { RowEditComponent } from './components/row-edit/row-edit.component';
import { WidgetPreviewComponent } from './components/widgets/widget-preview.component';
import { WidgetGroupFiltersEditComponent } from './components/widgets/group-filters/widget-group-filters-edit.component';
import { SearchResultsWidgetPreviewComponent } from './components/widgets/search-results-widget/search-results-widget-preview.component';
import { SearchFormWidgetPreviewComponent } from './components/widgets/search-form-widget/search-form-widget-preview.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { HtmlWidgetPreviewComponent } from './components/widgets/html-widget/html-widget-preview.component';
import { HtmlWidgetWidgetEditComponent } from './components/widgets/html-widget/html-widget-edit.component';
import { OneColLayoutComponent } from './components/layouts/one-col/one-col-layout.component';
import { TipsWidgetWidgetEditComponent } from './components/widgets/tips-widget/tips-widget-edit.component';
import { TipsWidgetPreviewComponent } from './components/widgets/tips-widget/tips-widget-preview.component';
import { FacetsWidgetWidgetEditComponent } from './components/widgets/facets-widget/facets-widget-edit.component';
import { FacetsWidgetPreviewComponent } from './components/widgets/facets-widget/facets-widget-preview.component';
import { WidgetBuilderRoutingModule } from './widget-builder-routing.module';
import { AddPageComponent } from './components/add-page/add-page.component';
import { TemplatePreviewModalComponent } from './components/add-page/preview/template-preview-modal.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { CoreModule } from '../core/core.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PublishPageConfirmationModalComponent } from "./components/modal/publish-page-confirmation-modal.component";

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
    WidgetPreviewComponent,
    WidgetGroupFiltersEditComponent,
    SearchResultsWidgetPreviewComponent,
    SearchFormWidgetPreviewComponent,
    HtmlWidgetWidgetEditComponent,
    HtmlWidgetPreviewComponent,
    TipsWidgetWidgetEditComponent,
    TipsWidgetPreviewComponent,
    FacetsWidgetWidgetEditComponent,
    FacetsWidgetPreviewComponent,
    AddPageComponent,
    TemplatePreviewModalComponent,
    PageListComponent,
    ToolbarComponent,
    PublishPageConfirmationModalComponent
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
    OneColLayoutComponent,
    WidgetPreviewComponent,
    WidgetGroupFiltersEditComponent,
    SearchResultsWidgetPreviewComponent,
    SearchFormWidgetPreviewComponent,
    HtmlWidgetWidgetEditComponent,
    HtmlWidgetPreviewComponent,
    TipsWidgetWidgetEditComponent,
    TipsWidgetPreviewComponent,
    FacetsWidgetWidgetEditComponent,
    FacetsWidgetPreviewComponent,
    TemplatePreviewModalComponent,
    ToolbarComponent,
    PublishPageConfirmationModalComponent
  ]
})

export class WidgetBuilderModule {
}
