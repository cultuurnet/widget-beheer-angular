import { PageTemplate } from '../pageTemplate';

/**
 * UiTPas page template
 */
export class UitPasPageTemplate implements PageTemplate {

  /**
   * The template label
   */
  public label = 'UiTPAS';

  /**
   * The template description
   */
  public description = 'Je kalender is geconfigureerd voor UiTPAS-evenementen en -voordelen.';

  /**
   * Preview available
   */
  public preview = true;

  /**
   * The template configuration
   */
  public configuration = {
    'title': 'Mijn UiTPASpagina',
    'rows': [
      {
        'type': 'one-col',
        'regions': {
          'content': {
            'widgets': [
              {
                'name': 'zoekformulier-1',
                'type': 'search-form'
              }
            ]
          }
        }
      },
      {
        'type': '2col-sidebar-left',
        'regions': {
          'sidebar_left': {
            'widgets': [
              {
                'type': 'html',
                'settings': {
                  'content': {
                    'body': "Uitpas tekst"
                  }
                }
              },
              {
                'type': 'facets'
              },
              {
                'type': 'html',
                'settings': {
                  'content': {
                    'body': "<a class='cultuurnet-logo-uiv-link' href='http://www.uitinvlaanderen.be' target='_blank'><img border='0' class='cultuurnet-logo-uiv' src='//udb2-media.imgix.net/static/uiv_btn_tips.png' alt='Meer tips op UiTinVlaanderen.be' /></a>"
                  }
                }
              }
            ]
          },
        },
        'content': {
          'widgets': [
            {
              'name': 'zoekresultaten-1',
              'type': 'search-results'
            }
          ]
        }
      }
    ],
    'styling': {}
  };

}
