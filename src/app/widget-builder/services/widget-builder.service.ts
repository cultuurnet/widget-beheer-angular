import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Widget } from "../../core/widget/widget";
import { WidgetPage } from "../../core/widget/widget-page";

@Injectable()
export class WidgetBuilderService {

  // Keep track of the widgetPage that is being edited in the builder
  public widgetPage: WidgetPage;

  // Observable string sources
  private widgetSelectedSource = new Subject<Widget>();

  // Observable string streams
  widgetSelected$ = this.widgetSelectedSource.asObservable();

  // Service message commands
  selectWidget(widget: Widget) {
    this.widgetSelectedSource.next(widget);
  }

}
