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
   * Widget page rows subject
   * @type {Subject<any>}
   */
  private widgetPageRows = new Subject<any>();

  /**
   * Widget selected subject
   * @type {Subject<Widget>}
   */
  private widgetSelected = new Subject<Widget>();

  /**
   * Observable selected widget
   */
  public widgetSelected$ = this.widgetSelected.asObservable();

  /**
   * Observable widget page rows
   */
  public widgetPageRows$ = this.widgetPageRows.asObservable();

  /**
   * Update the widget selected subject with the selected widget.
   * @param widget
   */
  selectWidget(widget: Widget) {
    this.widgetSelected.next(widget);
  }

  /**
   * Update the widget page rows subject
   * @param row
   */
  updateWidgetPageRows(row: Layout) {
    this.widgetPageRows.next(row);
  }

}
