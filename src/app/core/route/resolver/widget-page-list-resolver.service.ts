import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { WidgetService } from "../../widget/services/widget.service";
import { WidgetPage } from "../../widget/widget-page";
import { Observable } from "rxjs";

/**
 * Attempts to resolve a list of "WidgetPage" objects
 */
@Injectable()
export class WidgetPageListResolver implements Resolve<Object> {

  /**
   * WidgetPageListResolver constructor.
   * @param widgetService
   * @param router
   */
  constructor(private widgetService: WidgetService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<WidgetPage>> {
    const id = route.paramMap.get('project_id');

    return this.widgetService.getWidgetPages(id).map((widgetPages: Array<WidgetPage>) => {
      return widgetPages;
    }).catch(() => {
      this.router.navigate(['/']);
      return Observable.of(false);
    });
  }
}