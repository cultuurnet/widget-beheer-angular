import { PageTemplate } from '../pageTemplate';

export class BoaPageTemplate implements PageTemplate {
  public label = 'Buitenschoolse opvang en activiteiten (BOA)';

  public description =
    'De inhoud, weergave en filters van deze kalender zijn specifiek afgestemd op activiteiten voor kinderen alleen (BOA).';

  public preview = false;

  public configuration = {
    title: 'Mijn BOA agenda',
    rows: [
      {
        type: 'one-col',
        regions: {
          content: {
            widgets: [
              {
                name: 'zoekformulier-1',
                type: 'search-form',
                settings: {
                  fields: {
                    type: {
                      keyword_search: {
                        enabled: true,
                        label: 'Wat',
                        placeholder: 'bv. sportkamp, tekenles, jeugdbeweging',
                      },
                    },
                    location: {
                      keyword_search: {
                        enabled: false,
                      },
                    },
                    time: {
                      date_search: {
                        type: 'date_picker',
                      },
                    },
                    age: {
                      age_filter: {
                        enabled: true,
                      },
                      group_filters: {
                        enabled: false,
                      },
                    },
                  },
                },
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
                settings: {
                  filters: {
                    what: true,
                    where: false,
                    when: false,
                    facilities: false,
                  },
                  group_filters: {
                    enabled: true,
                    filters: [
                      {
                        label: 'Extra opties',
                        placeholder: '',
                        type: 'link',
                        default_option: '',
                        options: [
                          {
                            label: 'Gratis activiteiten',
                            query: 'price:0.0',
                          },
                          {
                            label: 'Voor UiTPAS en Paspartoe',
                            query: 'labels:uitpas* OR labels:paspartoe',
                          },
                          {
                            label: 'Met overnachting',
                            query: 'hasOvernightStay:true',
                          },
                          {
                            label: 'Zonder overnachting',
                            query: 'hasOvernightStay:false',
                          },
                        ],
                      },
                    ],
                  },
                },
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
                settings: {
                  general: {
                    exclude: {
                      long_term: false,
                      permanent: false,
                    },
                  },
                  footer: {
                    body: "<p>Organiseer je zelf opvang of activiteiten voor kinderen? Voeg je aanbod toe aan deze agenda via <a href='http://www.uitdatabank.be'>www.UiTdatabank.be</a></p>",
                  },
                  items: {
                    overnight: {
                      enabled: true,
                    },
                    when: {
                      enabled: true,
                      label: 'Wanneer',
                    },
                    icon_museumpass: {
                      enabled: false,
                    },
                    icon_uitx: {
                      enabled: false,
                    },
                    organizer: {
                      enabled: false,
                    },
                    age: {
                      enabled: true,
                      label: 'Leeftijd',
                    },
                    description: {
                      enabled: false,
                    },
                    audience: {
                      enabled: false,
                    },
                  },
                  detail_page: {
                    overnight: {
                      enabled: true,
                    },
                    when: {
                      enabled: true,
                      label: 'Wanneer',
                    },
                    icon_museumpass: {
                      enabled: false,
                    },
                    icon_uitx: {
                      enabled: false,
                    },
                    audience: {
                      enabled: false,
                    },
                    language_icons: {
                      enabled: false,
                    },
                    departure_places: {
                      enabled: true,
                    },
                    faq: {
                      enabled: true,
                    },
                  },
                  search_params: {
                    query: 'childrenOnly:true',
                  },
                },
              },
            ],
          },
        },
      },
    ],
    styling: {},
  };
}
