import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from "./components/add-page/add-page.component";

const pagesRoutes: Routes = [
  {
    path: 'project/:project_id/page/add',
    component: AddPageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }