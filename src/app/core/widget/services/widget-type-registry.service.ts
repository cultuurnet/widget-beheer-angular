import { Injectable, Type } from '@angular/core';
import { Widget } from '../widget';

@Injectable()
export class WidgetTypeRegistry {

  public widgetTypes = {};

  /**
   * Register a new widget type.
   * @param id
   * @param widgetType
   * @param label
   */
  public register(id, widgetType: Type<Widget>, label: string) {
    this.widgetTypes[id] = {
      widget: widgetType,
      label: label
    };
  }

  /**
   * Get an instance of given widget type.
   * @param widget
   * @returns {Widget}
   */
  public getInstance(widget: any) {
    if (this.widgetTypes.hasOwnProperty(widget.type)) {
      return new this.widgetTypes[widget.type].widget(widget.settings);
    }
  }
}
