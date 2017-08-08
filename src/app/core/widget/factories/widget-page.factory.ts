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
    // Rows need to be parsed
    let rows = null;
    if (jsonObject.hasOwnProperty('rows')) {
      rows = jsonObject['rows'];
    }

    delete jsonObject['rows'];

    let widgetPage = new WidgetPage(jsonObject);

    // Parse the rows
    if (rows) {
      for (let row of rows) {
        widgetPage.addRow(this.layoutFactory.create(row));
      }
    }

    return widgetPage;
  }

}