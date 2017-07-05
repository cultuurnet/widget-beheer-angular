import { Injectable, Type } from '@angular/core';
import { Widget } from '../widget';
import { AbstractWidgetEditComponent } from "../components/abstract-widget-edit-component";

@Injectable()
export class WidgetTypeRegistry {

  public widgetTypes = {};

  /**
   * Register a new widget type.
   * @param id
   * @param label
   * @param widgetType
   * @param editComponent
   */
  public register(id, label: string, widgetType: Type<Widget>, editComponent: Type<AbstractWidgetEditComponent>) {
    this.widgetTypes[id] = {
      widget: widgetType,
      label: label,
      editComponent: editComponent
    };
  }

  /**
   * Get the widget type from the registry.
   * @param type
   */
  public getWidgetType(type: string) {
    if (this.widgetTypes.hasOwnProperty(type)) {
      return this.widgetTypes[type];
    }
  }

  /**
   * Get an instance of given widget type.
   * @param type
   * @param settings
   * @returns {Widget}
   */
  public getInstance(type: string, settings: any) {
    if (this.widgetTypes.hasOwnProperty(type)) {
      return new this.widgetTypes[type].widget(type, settings);
    }
  }
}
