import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WidgetService } from '../../../core/widget/services/widget.service';
import { WidgetPage } from '../../../core/widget/widget-page';
import 'rxjs/add/operator/catch';

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

  /**
   * @inheritDoc
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<WidgetPage>> {
    const id = route.paramMap.get('project_id');

    return this.widgetService.getWidgetPages(id).map((widgetPages: Array<WidgetPage>) => {
      return widgetPages;
    }).catch(() => {
      return Observable.of([]);
    });
  }
}
