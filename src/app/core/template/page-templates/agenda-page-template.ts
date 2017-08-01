import { PageTemplate } from "../pageTemplate";

/**
 * Agenda page template
 */
export class AgendaPageTemplate implements PageTemplate {

  /**
   * The template label
   */
  public label: string = 'Agenda';

  /**
   * The template description
   */
  public description: string = 'Je start met een eenvoudige kalender met een zoekbox, zoekresultaten en verfijningen.';

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
