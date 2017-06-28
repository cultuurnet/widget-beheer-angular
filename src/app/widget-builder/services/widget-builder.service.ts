import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Widget } from "../../core/widget/widget";
import { WidgetPage } from "../../core/widget/widget-page";
import { Observable } from "rxjs";
import { Layout } from "../../core/layout/layout";

@Injectable()
export class WidgetBuilderService {

  /**
   * Keep track of the widgetPage that is being edited in the builder
   */
  public widgetPage: WidgetPage;

  /**
   * Wiget page rows subject
   * @type {Subject<any>}
   */
  private widgetPageRows = new Subject<any>();

  // Observable string sources
  private widgetSelectedSource = new Subject<Widget>();

  // Observable string streams
  widgetSelected$ = this.widgetSelectedSource.asObservable();

  // Service message commands
  selectWidget(widget: Widget) {
    this.widgetSelectedSource.next(widget);
  }

  /**
   * Update the widget page rows subject
   * @param row
   */
  updateWidgetPageRows(row: Layout) {
    this.widgetPageRows.next(row);
  }

  /**
   * Returns the widget page rows as observable
   * @returns {Observable<any>}
   */
  getWidgetPageRows(): Observable<any> {
    return this.widgetPageRows.asObservable();
  }

}
