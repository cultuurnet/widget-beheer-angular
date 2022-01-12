import { Injectable, Type } from '@angular/core';
import { Widget } from '../widget';
import { AbstractWidgetEditDirective } from '../components/abstract-widget-edit-component';
import * as deepmerge from 'deepmerge';
import * as _ from 'lodash';

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
   * Register a new widget type.
   * @param id
   * @param label
   * @param widgetType
   * @param editComponent
   */
  public register(
    id,
    label: string,
    widgetType: Type<Widget>,
    editComponent: Type<AbstractWidgetEditDirective>
  ) {
    this.widgetTypes[id] = {
      widget: widgetType,
      label: label,
      editComponent: editComponent,
      defaultSettings: {},
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
   * Get an instance of given widget type with default settings applied.
   * @param values
   *  Allowed properties:
   *   - id
   *   - type (required)
   *   - settings
   * @returns {Widget}
   */
  public getInstance(values: any) {
    if (values.hasOwnProperty('type')) {
      const type = values.type;

      if (this.widgetTypes.hasOwnProperty(type)) {
        // Return an instance of the requested Widget type with default settings if no settings are provided
        const settings = values.hasOwnProperty('settings')
          ? _.get(values, 'settings')
          : deepmerge.all(
              [
                this.widgetTypes[type].defaultSettings,
                _.get(values, 'settings', {}),
              ],
              { clone: true }
            );

        return new this.widgetTypes[type].widget({
          id: _.get(values, 'id'),
          name: _.get(values, 'name'),
          type: type,
          settings: settings,
        });
      }
    }
  }
}
