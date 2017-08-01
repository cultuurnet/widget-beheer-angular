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
   * The template title
   */
  public title: string = 'Mijn UiTPASpagina';

  /**
   * The template description
   */
  public description: string = 'Je kalender is geconfigureerd voor UiTPAS-evenementen en -voordelen.';

  /**
   * The template configuration
   */
  public configuration = {
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
