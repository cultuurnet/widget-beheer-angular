import { Injectable } from '@angular/core';

/**
 * Temporary service that mimics calls that should go to Silex
 */
@Injectable()
export class WidgetService {

  /**
   * Get the default settings for the given widget types
   * @param widgetTypes
   */
  getWidgetDefaultSettings(widgetTypes: any) {
    return {
      'search-form': {
        'fields': {
          'what': {
            'keyword_search': {
              'enabled' : true,
              'label': 'Wat',
              'placeholder': 'Bv. concert, Bart Peeters,...',
            },
            'group_filters': {
              'enabled': false,
            }
          }
        }
      }
    }
  }
}
