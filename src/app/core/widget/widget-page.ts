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
}