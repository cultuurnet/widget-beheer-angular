import { Layout } from "../layout/layout";

export class WidgetPage {
  id: string;
  title: string;
  rows: Array<Layout> = [];

  /**
   * Add a row to the widget page.
   * @param row
   */
  addRow(row: Layout) {
    this.rows.push(row);
  }

  /**
   * Remove a row from the widget page.
   * @param row
   */
  removeRow(row: Layout) {
    let index = this.rows.indexOf(row);
    if (index > -1) {
      this.removeRowAtIndex(index);
    }
  }

  /**
   * Remove a row from the widget page at a given index.
   * @param index
   */
  removeRowAtIndex(index: number) {
    this.rows.splice(index, 1);
  }
}