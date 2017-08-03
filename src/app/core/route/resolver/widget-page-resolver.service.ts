import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { WidgetService } from "../../widget/services/widget.service";
import { WidgetPage } from "../../widget/widget-page";

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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<WidgetPage> {
    const id = route.paramMap.get('page_id');

    return this.widgetService.getWidgetPage(id).toPromise().then((widgetPage: WidgetPage) => {
      return widgetPage;
    }, (reason) => {
      this.router.navigate(['/']);
      return null;
    });
  }
}