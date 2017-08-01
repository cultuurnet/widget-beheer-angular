import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetBuilderComponent } from "./widget-builder/widget-builder.component";
import { PageNotFoundComponent } from "./not-found.component";

const routes: Routes = [
  {
    path: '',
    component: WidgetBuilderComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
