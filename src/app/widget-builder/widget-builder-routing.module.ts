import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetBuilderComponent } from './widget-builder.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { ProjectResolver } from '../core/route/resolver/project-resolver.service';
import { WidgetPageResolver } from '../core/route/resolver/widget-page-resolver.service';
import { CoreModule } from '../core/core.module';
import { WidgetPageListResolver } from './route/resolver/widget-page-list-resolver.service';
import { AuthGuard } from '../core/route/guard/auth-guard.service';

const widgetBuilderRoutes: Routes = [
  {
    path: 'project/:project_id',
    component: PageListComponent,
    canActivate: [AuthGuard],
    resolve: {
      project: ProjectResolver,
      widgetPages: WidgetPageListResolver
    },
  },
  {
    path: 'project/:project_id/page/add',
    component: AddPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      project: ProjectResolver
    }
  },
  {
    path: 'project/:project_id/page/:page_id/edit',
    component: WidgetBuilderComponent,
    canActivate: [AuthGuard],
    resolve: {
      widgetPage: WidgetPageResolver,
      project: ProjectResolver
    }
  }
];

@NgModule({
  providers: [
    WidgetPageListResolver
  ],
  imports: [
    CoreModule,
    RouterModule.forChild(widgetBuilderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WidgetBuilderRoutingModule { }
