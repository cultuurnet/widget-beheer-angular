import { Layout } from "../layout/layout";
import { Widget } from "./widget";

/**
 * Represents a widget page
 * containing rows with regions and widgets.
 */
export class WidgetPage {

  /**
   * The widget page id
   */
  id: string;

  /**
   * The project id
   */
  project_id: string;

  /**
   * The widget page title
   */
  title: string;

  /**
   * The widget page rows
   */
  rows: Array<Layout> = [];

  /**
   * WidgetPage constructor.
   * @param values
   */
  constructor(values: any = {}) {
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    }
  }

  /**
   * Add a row to the widget page.
   * @param row
   */
  public addRow(row: Layout) {
    this.rows.push(row);
  }

  /**
   * Remove a row from the widget page.
   * @param row
   */
  public removeRow(row: Layout) {
    let index = this.rows.indexOf(row);
    if (index > -1) {
      this.removeRowAtIndex(index);
    }
  }

  /**
   * Remove a row from the widget page at a given index.
   * @param index
   */
  public removeRowAtIndex(index: number) {
    this.rows.splice(index, 1);
  }

  /**
   * Remove a widget from the widget page.
   *
   * @param widget
   * @returns {boolean}
   */
  public removeWidget(widget: Widget) {
    // Loop the rows (layouts)
    for (let rowKey in this.rows) {
      if (this.rows.hasOwnProperty(rowKey)) {

        // Loop the regions
        for (let regionId in this.rows[rowKey].regions) {
          if (this.rows[rowKey].regions.hasOwnProperty(regionId)) {
            let index = this.rows[rowKey].regions[regionId].widgets.indexOf(widget);
            if (index > -1) {
              this.rows[rowKey].regions[regionId].widgets.splice(index, 1);
              return true;
            }
          }
        }
      }
    }

    return false;
  }
}