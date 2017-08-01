import { Injectable } from "@angular/core";
import { LayoutFactory } from "../../layout/factories/layout.factory";
import { WidgetPage } from "../widget-page";
import * as _ from "lodash";

@Injectable()
export class WidgetPageFactory {

  /**
   * WidgetPageFactory constructor.
   * @param layoutFactory
   */
  constructor(private layoutFactory: LayoutFactory) {
  }

  /**
   * Create a WidgetPage object.
   * @param jsonObject
   * @returns {WidgetPage}
   */
  create(jsonObject: any) {
    let widgetPage = new WidgetPage({
      projectId: _.get(jsonObject, 'projectId', ''),
      title:  _.get(jsonObject, 'title', ''),
    });

    if (jsonObject.hasOwnProperty('rows')) {
      for (let row of jsonObject.rows) {
        widgetPage.addRow(this.layoutFactory.create(row));
      }
    }

    return widgetPage;
  }

}