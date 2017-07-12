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
          'place': {
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
              'enabled' : true
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
      }
    }
  }
}
