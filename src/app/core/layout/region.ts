import { Widget } from "../widget/widget";

export class Region {

  widgets: Array<Widget>;

  /**
   * Region constructor.
   * @param widgets
   */
  constructor(widgets: Array<Widget> = []) {
    this.widgets = widgets;
  }

  /**
   * Adds a widget to the region.
   * @param widget
   */
  addWidget(widget: Widget) {
    this.widgets.push(widget);
  }

  /**
   * Remove a widget from the region.
   * @param widget
   */
  removeWidget(widget: Widget) {
    let index = this.widgets.indexOf(widget);
    if (index > -1) {
      this.widgets.splice(index, 1);
    }
  }

}
