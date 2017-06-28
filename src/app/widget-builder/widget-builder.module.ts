import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { WidgetEditDirective } from './directives/widget-edit.directive';
import { WidgetService } from 'app/widget.service';
import { WidgetBuilderComponent } from './widget-builder.component';
import { CommonModule } from '@angular/common';
import { AddWidgetComponent } from './components/add-widget/add-widget.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
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
import { CoreModule } from "../core/core.module";
import { ViewModeSwitcherComponent } from "./components/view-mode-switcher/view-mode-switcher.component";

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
    FullWidthLayoutComponent,
    TwoColSidebarLeftLayoutComponent,
    TwoColSidebarRightLayoutComponent,
    ThreeColDoubleSidebarLayoutComponent,
    ViewModeSwitcherComponent
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
    CoreModule
  ],
  providers: [WidgetService, WidgetBuilderService],
  entryComponents: [
    SearchFormWidgetEditComponent,
    SearchResultsWidgetEditComponent,
    TwoColSidebarLeftLayoutComponent,
    TwoColSidebarRightLayoutComponent,
    ThreeColDoubleSidebarLayoutComponent,
    FullWidthLayoutComponent,
    ViewModeSwitcherComponent
  ]
})

export class WidgetBuilderModule {
}
