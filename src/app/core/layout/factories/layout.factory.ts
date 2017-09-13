import { Injectable } from '@angular/core';
import { Layout } from '../layout';
import { WidgetTypeRegistry } from '../../widget/services/widget-type-registry.service';
import { LayoutTypeRegistry } from '../services/layout-type-registry.service';

/**
 * The Layout factory is used for creating Layout objects from json strings
 */
@Injectable()
export class LayoutFactory {

  /**
   * LayoutFactory constructor.
   * @param widgetTypeRegistry
   * @param layoutTypeRegistry
   */
  constructor(private widgetTypeRegistry: WidgetTypeRegistry, private layoutTypeRegistry: LayoutTypeRegistry) {
  }

  /**
   * Create a Layout object.
   * @param jsonObject
   * @returns {Layout}
   */
  create(jsonObject: any) {
    const layout = this.layoutTypeRegistry.getInstance(jsonObject.type);

    // Fill the regions
    if (jsonObject.hasOwnProperty('regions')) {
      for (const regionId in jsonObject.regions) {
        if (jsonObject.regions.hasOwnProperty(regionId)) {
          // Parse widgets and add to the region
          for (const item in jsonObject.regions[regionId].widgets) {
            if (jsonObject.regions[regionId].widgets.hasOwnProperty(item)) {
              layout.regions[regionId].addWidget(
                this.widgetTypeRegistry.getInstance(
                  jsonObject.regions[regionId].widgets[item]),
                  jsonObject.regions[regionId].widgets[item].id
              );
            }
          }
        }
      }
    }

    return layout;
  }

}
