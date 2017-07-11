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
import { WidgetBuilderService } from "./services/widget-builder.service";
import { TranslateModule } from "@ngx-translate/core";
import { TwoColSidebarLeftLayoutComponent } from "./components/layouts/2col-sidebar-left/2col-sidebar-left-layout.component";
import { FullWidthLayoutComponent } from "./components/layouts/full-width/full-width-layout.component";
import { SearchFormWidgetEditComponent } from "./components/widgets/search-form-widget/search-form-widget-edit.component";
import { SearchResultsWidgetEditComponent } from "app/widget-builder/components/widgets/search-results-widget/search-results-widget-edit.component";
import { TwoColSidebarRightLayoutComponent } from "./components/layouts/2col-sidebar-right/2col-sidebar-right-layout.component";
import { ThreeColDoubleSidebarLayoutComponent } from "./components/layouts/3col-double-sidebar/3col-double-sidebar-layout.component";
import { AddRowComponent } from "./components/add-row/add-row.component";
import { RowEditComponent } from "./components/row-edit/row-edit.component";
import { ViewModeSwitcherComponent } from "./components/view-mode-switcher/view-mode-switcher.component";
import { WidgetPreviewComponent } from "./components/widgets/widget-preview.component";
import { WidgetGroupFiltersEditComponent } from "./components/widgets/group-filters/widget-group-filters-edit.component";
import { WidgetGroupFiltersGroupEditComponent } from "./components/widgets/group-filters/widget-group-filters-group-edit.component";
import { WidgetGroupFiltersGroupOptionEditComponent } from "./components/widgets/group-filters/widget-group-filters-group-option-edit.component";
import { SearchResultsWidgetPreviewComponent } from "./components/widgets/search-results-widget/search-results-widget-preview.component";
import { SearchFormWidgetPreviewComponent } from "./components/widgets/search-form-widget/search-form-widget-preview.component";
import { WidgetPreviewDirective } from "./directives/widget-preview.directive";

@NgModule({
  declarations: [
    WidgetEditDirective,
    RowLayoutDirective,
    WidgetPreviewDirective,
    SearchFormWidgetEditComponent,
    SearchResultsWidgetEditComponent,
    WidgetBuilderComponent,
    AddWidgetComponent,
    AddRowComponent,
    RowPreviewComponent,
    RowEditComponent,
    FullWidthLayoutComponent,
    TwoColSidebarLeftLayoutComponent,
    TwoColSidebarRightLayoutComponent,
    ThreeColDoubleSidebarLayoutComponent,
    ViewModeSwitcherComponent,
    WidgetPreviewComponent,
    WidgetGroupFiltersEditComponent,
    WidgetGroupFiltersGroupEditComponent,
    WidgetGroupFiltersGroupOptionEditComponent,
    SearchResultsWidgetPreviewComponent,
    SearchFormWidgetPreviewComponent
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
    NgbAccordionModule,
    NgbTabsetModule,
    ReactiveFormsModule
  ],
  providers: [WidgetBuilderService],
  entryComponents: [
    SearchFormWidgetEditComponent,
    SearchResultsWidgetEditComponent,
    TwoColSidebarLeftLayoutComponent,
    TwoColSidebarRightLayoutComponent,
    ThreeColDoubleSidebarLayoutComponent,
    FullWidthLayoutComponent,
    ViewModeSwitcherComponent,
    WidgetPreviewComponent,
    WidgetGroupFiltersEditComponent,
    WidgetGroupFiltersGroupEditComponent,
    WidgetGroupFiltersGroupOptionEditComponent,
    SearchResultsWidgetPreviewComponent,
    SearchFormWidgetPreviewComponent
  ]
})

export class WidgetBuilderModule {
}
