import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { WidgetService } from '../../../core/widget/services/widget.service';
import { WidgetPage } from '../../../core/widget/widget-page';

/**
 * Attempts to resolve a list of "WidgetPage" objects
 */
@Injectable()
export class WidgetPageListResolver implements Resolve<unknown> {
  /**
   * WidgetPageListResolver constructor.
   * @param widgetService
   * @param router
   */
  constructor(private widgetService: WidgetService, private router: Router) {}

  /**
   * @inheritDoc
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<WidgetPage>> {
    const id = route.paramMap.get('project_id');

    return this.widgetService.getWidgetPages(id).pipe(
      map((widgetPages: Array<WidgetPage>) => {
        return widgetPages;
      }),
      catchError(() => {
        return observableOf([]);
      })
    );
  }
}
