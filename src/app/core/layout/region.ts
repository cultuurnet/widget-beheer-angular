import { Widget } from '../widget/widget';

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
}
