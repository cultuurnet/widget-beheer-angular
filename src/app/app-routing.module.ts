import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/route/components/not-found.component';
import { ProjectNoAccessComponent } from './core/route/components/project-no-access.component';

const routes: Routes = [
  {
    path: 'project-no-access',
    component: ProjectNoAccessComponent,
  },
  {
      path: '**',
      component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
