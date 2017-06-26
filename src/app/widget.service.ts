import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Config } from "./config";
import { WidgetTypeRegistry } from "./core/widget/services/widget-type-registry.service";
import { WidgetPageFactory } from "./core/widget/factories/widget-page.factory";

@Injectable()
export class WidgetService {

  /**
   * WidgetService constructor.
   * @param widgetTypeRegistry
   * @param widgetpageFactory
   */
  constructor(private widgetTypeRegistry: WidgetTypeRegistry, private widgetpageFactory: WidgetPageFactory) {
  }

  /**
   * Get a widget page by id
   * @param id
   * @returns {WidgetPage}
   */
  getWidgetPage(id: string) {
    return this.widgetpageFactory.create(Config.EXAMPLE_PAGE);
  }

  getWidgets() {
    let widgetOne = {
      type: 'search-form',
      settings: {
        'setting1': true,
        'setting2': false
      }
    };

    let widgetTwo = {
      type: 'search-results',
      settings: {
        'setting3': true,
        'setting4': false
      }
    };

    let widgets = [
      this.widgetTypeRegistry.getInstance(widgetOne.type, widgetOne.settings),
      this.widgetTypeRegistry.getInstance(widgetTwo.type, widgetTwo.settings)
    ];

    return widgets.filter(function (n) {
      return n !== undefined;
    });
  }
}
