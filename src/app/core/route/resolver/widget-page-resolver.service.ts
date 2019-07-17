import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { WidgetService } from '../../widget/services/widget.service';
import { WidgetPage } from '../../widget/widget-page';
import { Observable } from 'rxjs/Observable';

/**
 * Attempts to resolve a "WidgetPage" from the route
 */
@Injectable()
export class WidgetPageResolver implements Resolve<Object> {

  /**
   * WidgetPageResolver constructor.
   * @param widgetService
   * @param router
   */
  constructor(private widgetService: WidgetService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
    const page_id = route.paramMap.get('page_id');
    const project_id = route.paramMap.get('project_id');

    return this.widgetService.getWidgetPage(project_id, page_id).map((widgetPage: WidgetPage) => {
      return widgetPage;
    }).catch(() => {
      this.router.navigate(['/']);
      return Observable.of(false);
    });
  }
}
