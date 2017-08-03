import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService } from "../../project/services/project.service";

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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const id = route.paramMap.get('project_id');

    return this.projectService.getProject(id).toPromise().then((project) => {
      return project;
    }, (reason) => {
      this.router.navigate(['/']);
      return null;
    });
  }
}