import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Widget } from "../../widget/widget";

@Injectable()
export class WidgetBuilderService {

  // Observable string sources
  private widgetSelectedSource = new Subject<Widget>();

  // Observable string streams
  widgetSelected$ = this.widgetSelectedSource.asObservable();

  // Service message commands
  selectWidget(widget: Widget) {
    this.widgetSelectedSource.next(widget);
  }

}
