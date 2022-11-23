import { Layout } from '../layout/layout';
import { Widget } from './widget';

/**
 * Represents a widget page
 * containing rows with regions and widgets.
 */
export class WidgetPage {
  /**
   * The widget page id
   */
  public id: string;

  /**
   * The project id
   */
  public project_id: string;

  /**
   * The widget page title
   */
  public title: string;

  /**
   * The widget version
   */
  public version: number;

  /**
   * The widget page css
   */
  public css: string;

  /**
   * The widget page selectedTheme
   */
  public selectedTheme: any;

  /**
   * The widget page mobile setting
   */
  public mobile: boolean;

  /**
   * The widget page jquery setting
   */
  public jquery: boolean;

  /**
   * The widget page language setting
   */
  public language: string;

  /**
   * Widget page draft state
   */
  public draft: boolean;

  /**
   * The widget page rows
   */
  rows: Array<Layout> = [];

  /**
   * WidgetPage constructor.
   * @param values
   */
  constructor(values: any = {}) {
    for (const key in values) {
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
    const index = this.rows.indexOf(row);
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
  public removeWidget(widget: Widget): boolean {
    this.rows.forEach((row, rowIndex) => {
      Object.keys(row.regions).forEach((key) => {
        const foundIndex = row.regions[key].widgets.findIndex(
          (currentWidget) => currentWidget.id === widget.id
        );
        if (foundIndex > -1) {
          this.rows[rowIndex].regions[key].widgets.splice(foundIndex, 1);
          return true;
        }
      });
    });
    return false;
  }

  /**
   * Find a widget by id in the page
   * @param widgetId
   */
  public findWidget(widgetId: string): Widget | boolean {
    this.rows.forEach((row) => {
      Object.values(row.regions).forEach((region) => {
        const widget = region.widgets.find(
          (currentWidget) => currentWidget.id === widgetId
        );
        return widget;
      });
    });
    return false;
  }
}
