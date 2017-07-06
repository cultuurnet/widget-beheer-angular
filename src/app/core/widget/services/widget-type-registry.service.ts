import { Injectable, Type } from '@angular/core';
import { Widget } from '../widget';
import { AbstractWidgetEditComponent } from "../components/abstract-widget-edit-component";
import { WidgetService } from "./widget.service";

/**
 * The widget type registry allows for registering of widget types
 * and linking them to their components
 */
@Injectable()
export class WidgetTypeRegistry {

  /**
   * The available widget types
   */
  public widgetTypes: any = {};

  /**
   * WidgetTypeRegistry constructor
   */
  constructor(private widgetService: WidgetService) {
  }

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
      editComponent: editComponent,
      defaultSettings: {'default_settings': 'hello world'}
    };
  }

  /**
   * Load the widget default settings onto the registered widgets
   */
  public loadWidgetDefaultSettings() {
    let defaultSettings = this.widgetService.getWidgetDefaultSettings(Object.keys(this.widgetTypes));

    for (let widgetType in defaultSettings) {
      if (defaultSettings.hasOwnProperty(widgetType) &&  this.widgetTypes.hasOwnProperty(widgetType)) {
        this.widgetTypes[widgetType].defaultSettings = defaultSettings[widgetType];
      }
    }
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
  public getInstance(type: string, settings?: any) {
    if (this.widgetTypes.hasOwnProperty(type)) {

      // Return an instance of the requested Widget type with default settings if no settings are provided
      let defaultSettings = this.widgetTypes[type].defaultSettings;
      if (!settings) {
        settings = defaultSettings;
      }

      return new this.widgetTypes[type].widget(type, settings);
    }
  }
}
