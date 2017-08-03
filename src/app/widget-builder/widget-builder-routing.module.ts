import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetBuilderComponent } from "./widget-builder.component";
import { AddPageComponent } from "./components/add-page/add-page.component";
import { PageListComponent } from "./components/page-list/page-list.component";
import { ProjectResolver } from "../core/route/resolver/project-resolver.service";
import { WidgetPageResolver } from "../core/route/resolver/widget-page-resolver.service";
import { CoreModule } from "../core/core.module";

const widgetBuilderRoutes: Routes = [
  {
    path: 'project/:project_id',
    component: PageListComponent,
  },
  {
    path: 'project/:project_id/page/add',
    component: AddPageComponent,
    resolve: {
      project: ProjectResolver
    }
  },
  {
    path: 'project/:project_id/page/:page_id/edit',
    component: WidgetBuilderComponent,
    resolve: {
      widgetPage: WidgetPageResolver,
      project: ProjectResolver
    }
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(widgetBuilderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WidgetBuilderRoutingModule { }