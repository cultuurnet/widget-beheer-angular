import { Injectable } from '@angular/core';
import { WidgetPage } from "../widget-page";
import * as _ from "lodash";

/**
 * Temporary service that mimics calls that should go to Silex
 */
@Injectable()
export class WidgetService {

  private cache: any = {
    renderedWidgets: {}
  };

  /**
   * /**
   * Performs a save of the widget page.
   * Provide an optional triggering widget id to do a partial render.
   *
   * Returns a render of the triggeringWidget if provided.
   *
   * @param widgetPage
   * @param widgetId
   * @return {Promise<T>}
   */
  public saveWidgetPage(widgetPage: WidgetPage, widgetId?: string) {
    console.log('save');
    // @todo: Implement the save request
    let _self = this;
    return new Promise((resolve, reject) => {
      if (widgetId) {
        // If the widget page save is triggered by a widget, we can expect the rendered widget in the response
        // Set the response in the renderedWidgets cache
        setTimeout(function() {
          let response = _self.fakeRenderResponse(widgetId);
          _.set(_self.cache.renderedWidgets, [widgetPage.id, widgetId], response);

          resolve({content: response});
        }, _.random(1000, 3000));
      } else {
        resolve();
      }
    });
  }

  /**
   * Renders a widget in a given widget page.
   *
   * @param widgetPageId
   * @param widgetId
   * @param reset
   */
  public renderWidget(widgetPageId: string, widgetId: string, reset: boolean = false) {
    // @todo Implement the render request
    let _self = this;
    let renderedWidget = _.get(this.cache.renderedWidgets, [widgetPageId, widgetId], false);

    // Cache hit and no reset
    if (renderedWidget && !reset) {
      return Promise.resolve({content: renderedWidget});
    }

    // Service request
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        let response = _self.fakeRenderResponse(widgetId);
        _.set(_self.cache.renderedWidgets, [widgetPageId, widgetId], response);

        resolve({content: response});
      }, _.random(1000, 3000));
    });
  }

  /**
   * Returns a fake render response
   * @todo: Remove
   *
   * @param widgetId
   * @returns {string}
   */
  private fakeRenderResponse(widgetId: string) {
    let response = '';

    switch(widgetId) {
      case 'd1ae67d3-60a3-8f74-d64f-9c97c3afe6b6': {
        response = 'search form preview';
        break;
      }
      case 'c039e4b6-3d61-1c2a-d028-4606fa56c4c9': {
        response = 'search results preview';
        break;
      }
      default: {
        response = 'default widget preview';
        break;
      }
    }

    return response + ' ' + Math.random().toString(36).slice(2);
  }

  /**
   * Get the default settings for the given widget types.
   *
   * @param widgetTypes
   */
  public getWidgetDefaultSettings(widgetTypes: any) {
    return {
      'search-form': {
        'general': {
          'new_window': false,
          'button_label': 'Zoeken'
        },
        'header': {
          'body': '<p>Uit in ...</p>',
        },
        'fields': {
          'type': {
            'keyword_search': {
              'enabled' : true,
              'label': 'Wat',
              'placeholder': 'Bv. concert, Bart Peeters,...',
            },
            'group_filters': {
              'enabled': false,
            }
          },
          'location': {
            'keyword_search': {
              'enabled' : true,
              'label': 'Wat',
              'placeholder': 'Bv. concert, Bart Peeters,...',
            },
            'group_filters': {
              'enabled': false
            }
          },
          'time': {
            'date_search': {
              'enabled' : true,
              'options': {
                'today': true,
                'tomorrow': true,
                'weekend': true,
                'days_7': true,
                'days_14': true,
                'days_30': true,
                'custom_date': true
              }
            },
            'group_filters': {
              'enabled': false
            }
          },
          'extra': {
            'group_filters': {
              'enabled': false
            }
          }
        },
        'footer': {
          'body': '<a href="http://www.uitinvlaanderen.be" target="_blank"><img border="0" class="cultuurnet-logo-uiv" src="http://tools.uitdatabank.be/sites/all/modules/cul_widgets_server/images/uiv-btn.jpg" alt="Meer tips op UiTinVlaanderen.be" /></a>'
        }
      },
    }
  }
}
