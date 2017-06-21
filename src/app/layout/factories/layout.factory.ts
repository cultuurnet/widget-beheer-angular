import { Injectable } from "@angular/core";
import { Layout } from "../layout";
import { WidgetTypeRegistry } from "../../widget/services/widget-type-registry.service";

@Injectable()
export class LayoutFactory {

  /**
   * LayoutFactory constructor.
   * @param widgetTypeRegistry
   */
  constructor(private widgetTypeRegistry: WidgetTypeRegistry) {
  }

  /**
   * Create a Layout object.
   * @param jsonObject
   * @returns {Layout}
   */
  create(jsonObject: any) {
    let layout = new Layout(jsonObject.type);

    if (jsonObject.regions) {
      // Iterate the regions
      for (let regionId in jsonObject.regions) {
        if (jsonObject.regions.hasOwnProperty(regionId)) {
          // Add the region
          let region = layout.addRegion(regionId);

          // Parse widgets and add to the region
          for (let item in jsonObject.regions[regionId].widgets) {
            if (jsonObject.regions[regionId].widgets.hasOwnProperty(item)) {
              region.addWidget(this.widgetTypeRegistry.getInstance(jsonObject.regions[regionId].widgets[item]));
            }
          }
        }
      }
    }

    return layout;
  }

}