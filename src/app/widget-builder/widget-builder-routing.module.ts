import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetBuilderComponent } from "./widget-builder.component";

const widgetBuilderRoutes: Routes = [
  {
    path: 'project/:project_id/page/:page_id/edit',
    component: WidgetBuilderComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(widgetBuilderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WidgetBuilderRoutingModule { }