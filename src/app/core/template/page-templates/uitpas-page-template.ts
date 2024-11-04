import { PageTemplate } from '../pageTemplate';

/**
 * UiTPas page template
 */
export class UitPasPageTemplate implements PageTemplate {
  /**
   * The template label
   */
  public label = 'UiTPAS en Paspartoe';

  /**
   * The template description
   */
  public description =
    'Deze kalender is gefilterd op evenementen en voordelen van UiTPAS- of Paspartoe.';

  /**
   * Preview available
   */
  public preview = true;

  /**
   * The template configuration
   */
  public configuration = {
    title: 'Mijn UiTPASpagina',
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
                  general: {
                    destination: '',
                    new_window: false,
                    button_label: 'Zoeken',
                  },
                  header: {
                    body: "<h2><img alt='UiTPAS' class='logo-uiv' src='https://projectaanvraag-api-test.uitdatabank.be/assets/images/uitpas-logo.svg' style='height:35px' /></h2>\n",
                  },
                  fields: {
                    type: {
                      keyword_search: {
                        enabled: true,
                        label: 'Wat',
                        placeholder: 'Bv. concert, Bart Peeters,...',
                      },
                      group_filters: {
                        enabled: false,
                      },
                    },
                    location: {
                      keyword_search: {
                        enabled: false,
                        label: 'Waar',
                        placeholder: 'Bv. Gent, 2000',
                      },
                      group_filters: {
                        enabled: false,
                      },
                    },
                    time: {
                      date_search: {
                        enabled: true,
                        label: 'Wanneer',
                        placeholder: 'Kies een periode',
                        options: {
                          today: true,
                          tomorrow: true,
                          weekend: true,
                          days_7: true,
                          days_14: true,
                          days_30: true,
                          custom_date: true,
                        },
                        default_option: 'placeholder',
                      },
                      group_filters: {
                        enabled: false,
                      },
                    },
                    extra: {
                      group_filters: {
                        enabled: true,
                        filters: [
                          {
                            label: 'UiTPAS',
                            placeholder: '',
                            type: 'select_single',
                            default_option: 'Enkel UiTPAS evenementen',
                            options: [
                              {
                                label: 'Enkel UiTPAS evenementen',
                                query: 'labels:uitpas* OR labels:paspartoe',
                              },
                              {
                                label: 'Alle evenementen',
                                query: 'labels:*',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  footer: {
                    body: '',
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
          content: {
            widgets: [
              {
                type: 'search-results',
                name: 'zoekresultaten-1',
                settings: {
                  general: {
                    current_search: true,
                    exclude: {
                      long_term: true,
                      permanent: true,
                    },
                  },
                  header: {
                    body: '',
                  },
                  footer: {
                    body: '<p>Zelf een activiteit toevoegen? Dat kan via <a href="http://www.uitdatabank.be">www.UiTdatabank.be</a></p>',
                  },
                  items: {
                    type: {
                      enabled: true,
                    },
                    icon_vlieg: {
                      enabled: true,
                    },
                    icon_uitpas: {
                      enabled: true,
                    },
                    icon_museumpass: {
                      enabled: true,
                    },
                    icon_uitx: {
                      enabled: false,
                    },
                    description: {
                      enabled: true,
                      characters: 200,
                    },
                    when: {
                      enabled: true,
                      label: 'Wanneer',
                    },
                    where: {
                      enabled: true,
                      label: 'Waar',
                    },
                    organizer: {
                      enabled: true,
                      label: 'Organisatie',
                    },
                    age: {
                      enabled: true,
                      label: 'Leeftijd',
                    },
                    language_icons: {
                      enabled: false,
                    },
                    image: {
                      enabled: true,
                      width: 480,
                      height: 360,
                      default_image: {
                        enabled: true,
                        type: 'uit',
                      },
                      position: 'left',
                    },
                    labels: {
                      enabled: false,
                      limit_labels: {
                        enabled: false,
                        labels: '',
                      },
                    },
                    read_more: {
                      enabled: true,
                      label: 'Lees verder',
                    },
                  },
                  detail_page: {
                    map: false,
                    price_information: true,
                    contact_information: true,
                    reservation_information: true,
                    language_switcher: false,
                    uitpas_benefits: true,
                    share_buttons: true,
                    back_button: {
                      enabled: true,
                      label: 'Agenda',
                      url: '',
                    },
                    icon_vlieg: {
                      enabled: true,
                    },
                    icon_uitpas: {
                      enabled: true,
                    },
                    icon_museumpass: {
                      enabled: true,
                    },
                    icon_uitx: {
                      enabled: false,
                    },
                    when: {
                      enabled: true,
                      label: 'Wanneer',
                    },
                    where: {
                      enabled: true,
                      label: 'Waar',
                    },
                    organizer: {
                      enabled: true,
                      label: 'Organisatie',
                    },
                    age: {
                      enabled: true,
                      label: 'Leeftijd',
                    },
                    language_icons: {
                      enabled: false,
                    },
                    image: {
                      enabled: true,
                      width: 480,
                      height: 360,
                      default_image: {
                        enabled: true,
                        type: 'uit',
                      },
                      position: 'left',
                    },
                    labels: {
                      enabled: false,
                      limit_labels: {
                        enabled: false,
                        labels: '',
                      },
                    },
                    description: {
                      enabled: true,
                      characters: 200,
                      label: '',
                    },
                  },
                  search_params: {
                    query: 'labels:uitpas* OR labels:paspartoe',
                  },
                },
              },
            ],
          },
          sidebar_left: {
            widgets: [
              {
                type: 'facets',
                settings: {
                  filters: {
                    what: true,
                    where: true,
                    when: true,
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
                            label: '',
                            query: '',
                          },
                          {
                            label: 'Voor kinderen',
                            query:
                              "typicalAgeRange:12 OR labels:'ook voor kinderen'",
                          },
                          {
                            label: 'Gratis activiteiten',
                            query: 'price:0.0',
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
                    body: "<div>\n<p><strong>Over UiTPAS</strong></p>\n\n<p>Met de UiTPAS kan je punten sparen en omruilen voor leuke <a href='https://www.uitpas.be/voordelen-zoeken'>voordelen</a>.</p>\n\n<p><a class='btn btn-primary' href='https://www.uitpas.be/activiteiten-in-de-regio'>Haal nu je UiTPAS</a></p>\n</div>\n",
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
        },
      },
    ],
    styling: {},
  };
}
