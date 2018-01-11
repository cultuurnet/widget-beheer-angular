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
