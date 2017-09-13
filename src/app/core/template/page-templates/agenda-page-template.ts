import { PageTemplate } from '../pageTemplate';

/**
 * Agenda page template
 */
export class AgendaPageTemplate implements PageTemplate {

  /**
   * The template label
   */
  public label = 'Agenda';

  /**
   * The template description
   */
  public description = 'Je start met een eenvoudige kalender met een zoekbox, zoekresultaten en verfijningen.';

  /**
   * Preview available
   */
  public preview = true;

  /**
   * The template configuration
   */
  public configuration = {
    'title': 'Mijn kalenderpagina',
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
                'type': 'facets'
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
