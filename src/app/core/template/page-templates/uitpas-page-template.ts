import { PageTemplate } from "../pageTemplate";

/**
 * UiTPas page template
 */
export class UitPasPageTemplate implements PageTemplate {

  /**
   * The template label
   */
  public label: string = 'UiTPAS';

  /**
   * The template description
   */
  public description: string = 'Je kalender is geconfigureerd voor UiTPAS-evenementen en -voordelen.';

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
                'type': 'html'
              },
              {
                'type': 'facets'
              },
              {
                'type': 'html'
              },
            ]
          },
          'content': {
            'widgets': [
              {
                'type': 'search-results'
              }
            ]
          }
        }
      }
    ],
    'styling': {}
  };

}
