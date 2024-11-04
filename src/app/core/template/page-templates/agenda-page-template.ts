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
  public description =
    'Je start met een eenvoudige kalender met een zoekbox, zoekresultaten en verfijningen.';

  /**
   * Preview available
   */
  public preview = true;

  /**
   * The template configuration
   */
  public configuration = {
    title: 'Mijn kalenderpagina',
    rows: [
      {
        type: 'one-col',
        regions: {
          content: {
            widgets: [
              {
                name: 'zoekformulier-1',
                type: 'search-form',
              },
            ],
          },
        },
      },
      {
        type: '2col-sidebar-left',
        regions: {
          sidebar_left: {
            widgets: [
              {
                type: 'facets',
              },
              {
                type: 'html',
                settings: {
                  content: {
                    body: "<p class='cultuurnet-logo-uiv-baseline' style='margin-bottom:0;text-align:center;'>Meer inspiratie voor vrije tijd? Ga naar <a href='http://www.uitinvlaanderen.be' target='_blank'>uitinvlaanderen.be</a></p><a class='cultuurnet-logo-uiv-link' href='http://www.uitinvlaanderen.be' target='_blank' alt='Meer tips op UiTinVlaanderen.be'><img src='https://projectaanvraag-api.uitdatabank.be/assets/images/uitinvlaanderen-logo.svg' width='208' height='60' alt='Meer tips op UiTinVlaanderen.be'></a>",
                  },
                },
              },
            ],
          },
          content: {
            widgets: [
              {
                name: 'zoekresultaten-1',
                type: 'search-results',
              },
            ],
          },
        },
      },
    ],
    styling: {},
  };
}
