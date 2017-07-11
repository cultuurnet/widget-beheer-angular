import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Widget } from "../../core/widget/widget";
import { WidgetPage } from "../../core/widget/widget-page";

@Injectable()
export class WidgetBuilderService {

  /**
   * Keep track of the widgetPage that is being edited in the builder
   */
  public widgetPage: WidgetPage;

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
   * Keep track of the active widget in the widget builder
   */
  private activeWidget: Widget;

  /**
   * Get the currently active widget
   */
  public getActiveWidget() {
    return this.activeWidget;
  }

  /**
   * Update the widget selected subject with the selected widget.
   * @param widget
   */
  public selectWidget(widget?: Widget) {
    this.activeWidget = widget;

    // Update the observable
    this.widgetSelected.next(widget);
  }

}
