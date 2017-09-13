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
                'name': 'html-1',
                'type': 'html'
              },
              {
                'name': 'facets-1',
                'type': 'facets'
              },
              {
                'name': 'html-2',
                'type': 'html'
              },
            ]
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
      }
    ],
    'styling': {}
  };

}
