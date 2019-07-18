import { Injectable } from '@angular/core';
import {of as observableOf,  Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService } from '../../project/services/project.service';

/**
 * Attempts to resolve a "project" from the route
 */
@Injectable()
export class ProjectResolver implements Resolve<Object> {

  /**
   * ProjectResolver constructor.
   * @param projectService
   * @param router
   */
  constructor(private projectService: ProjectService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('project_id');

    return this.projectService.getProject(id).pipe(map(project => {
      return project;
    }),catchError(e => {
      if (e.status === 403) {
          this.router.navigate(['/project-no-access']);
      }
      else {
          this.router.navigate(['']);
      }

      return observableOf(false);
    }),);
  }
}
