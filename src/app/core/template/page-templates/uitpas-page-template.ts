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
                    body: "<p class='cultuurnet-logo-uiv-baseline' style='text-align:center;margin-bottom:0;'>Meer inspiratie voor je vrije tijd? Ga naar</p><a class='cultuurnet-logo-uiv-link' href='http://www.uitinvlaanderen.be' target='_blank' alt='Meer tips op UiTinVlaanderen.be'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 223 37' fill='#40404a'  width='208' height='60'><defs /><g fill-rule='nonzero'><path d='M22 22.2386c0 2.5025-.2602 4.5582-2.1247 6.3457-1.691 1.6088-3.729 2.1897-5.7669 2.3685-1.7778.1787-4.1192-.1341-5.6369-1.2066C6.3902 28.2268 6 25.9477 6 22.9982V7l6.0705.5363v14.5235c0 .7597-.0434 1.8323.3468 2.5473.477.715 1.3876.9831 2.1247.9384.6938-.0447 1.5176-.3128 2.038-.849.7804-.8044.6937-1.9663.6937-2.9942V7.9831l4.683.4022L22 22.2386zM29 13.1945l-6-.2664V8l6 .4884v4.7061zm0 15.3171L23 29V14.5708l6 .1776v13.7632zM39.9185 28.5011L34.1693 29V14.0794L30 13.898V9l14 1.1791v4.3084l-4.0815-.1814v14.195z'/><path d='M0 0h61v37H0l48.7912-6.1667V6.1667zM71.0872 10.3073v3.9073h-4.9118v-3.9073h4.9118zm0 4.8293v12.556h-4.9118v-12.556h4.9118zM85.91 27.6488h-4.9117v-7.9025c0-.6585-.0877-1.0536-.307-1.2292-.2192-.1756-.4385-.2634-.7455-.2634-.877 0-1.3595.6146-1.3595 1.8878v7.5512h-4.9117V15.1366h4.5609v1.756c.6578-1.3609 1.8857-2.0194 3.596-2.0194.921 0 1.6665.1756 2.3244.5268.614.3512 1.0963.7902 1.3595 1.361.263.5707.3947 1.5366.3947 2.8975v7.9903zM103.1888 10.8341l-5.2187 16.8147h-5.2626l-5.438-16.8147h5.438l2.6752 9.1757c.1754.5268.3508 1.0975.4824 1.6243l3.1137-10.756h4.21v-.044zM109.4162 10.8341v16.8147h-4.824V10.834zM124.6338 27.6488h-4.6925c-.1315-.5268-.1754-1.0976-.1754-1.7561-.877 1.361-2.2366 2.0195-4.0346 2.0195-1.491 0-2.5874-.3951-3.333-1.1415-.7455-.7463-1.0963-1.6244-1.0963-2.5902 0-1.317.614-2.4146 1.798-3.2049 1.184-.8341 3.333-1.317 6.4028-1.4927v-.2634c0-.5707-.1316-.922-.3947-1.0975-.2631-.1757-.614-.2635-1.0964-.2635-1.1402 0-1.7542.439-1.8857 1.361l-4.4732-.439c.6578-2.6342 2.8067-3.9512 6.5344-3.9512 1.0086 0 1.9296.0878 2.7628.3073.8332.2195 1.535.5268 2.0173.922.4824.439.8333.878 1.0087 1.361.1754.4828.2631 1.4048.2631 2.7658v5.0048c0 .9659.1316 1.8.3947 2.4586zm-5.0872-5.883c-2.105.2196-3.1575.8781-3.1575 2.0196 0 .7463.3947 1.1414 1.228 1.1414.5262 0 .9647-.1756 1.3594-.4829.3509-.3073.5701-1.0098.5701-2.0634v-.6146zM139.4128 27.6488h-4.6924c-.1316-.5268-.1754-1.0976-.1754-1.7561-.8771 1.361-2.2366 2.0195-4.0347 2.0195-1.491 0-2.5874-.3951-3.333-1.1415-.7455-.7463-1.0963-1.6244-1.0963-2.5902 0-1.317.614-2.4146 1.798-3.2049 1.1841-.8341 3.333-1.317 6.4028-1.4927v-.2634c0-.5707-.1315-.922-.3946-1.0975-.2632-.1757-.614-.2635-1.0964-.2635-1.1402 0-1.7542.439-1.8858 1.361l-4.4732-.439c.6579-2.6342 2.8067-3.9512 6.5344-3.9512 1.0087 0 1.9296.0878 2.7629.3073.8332.2195 1.5349.5268 2.0173.922.4824.439.8332.878 1.0086 1.361.1754.4828.2632 1.4048.2632 2.7658v5.0048c0 .9659.1315 1.8.3946 2.4586zm-5.0871-5.883c-2.105.2196-3.1575.8781-3.1575 2.0196 0 .7463.3946 1.1414 1.2279 1.1414.5262 0 .9648-.1756 1.3595-.4829.3508-.3073.5701-1.0098.5701-2.0634v-.6146zM153.7972 27.6488h-4.9117v-7.9025c0-.6585-.0877-1.0536-.307-1.2292-.2193-.1756-.4386-.2634-.7455-.2634-.8771 0-1.3595.6146-1.3595 1.8878v7.5512h-4.9118V15.1366h4.561v1.756c.6577-1.3609 1.8857-2.0194 3.596-2.0194.921 0 1.6665.1756 2.3243.5268.614.3512 1.0964.7902 1.3595 1.361.2631.5707.3947 1.5366.3947 2.8975v7.9903zM168.6201 27.6488h-4.6047v-1.6683c-.7017 1.2732-1.798 1.9317-3.3769 1.9317-1.4472 0-2.6312-.5707-3.5083-1.7122s-1.3595-2.7659-1.3595-4.917c0-2.0196.4385-3.6 1.3595-4.7854.921-1.1854 2.105-1.7561 3.596-1.7561 1.228 0 2.2805.4829 3.0699 1.4048v-5.3122h4.824v16.8147zm-4.824-8.0342c0-1.1414-.4824-1.6683-1.4034-1.6683-.6578 0-1.0525.3513-1.2718 1.0537-.2192.7024-.307 1.5805-.307 2.6341 0 2.0196.5263 3.0293 1.535 3.0293.3947 0 .7455-.1756 1.0086-.483.2632-.3072.3947-.7902.3947-1.4487v-3.117h.0439zM179.496 23.1707l4.561.3073c-.2631 1.2293-.9648 2.283-2.0612 3.161-1.0964.878-2.6313 1.3171-4.517 1.3171-2.105 0-3.7715-.6146-5.0433-1.8439-1.2718-1.2293-1.8858-2.722-1.8858-4.522 0-1.8878.614-3.4682 1.842-4.7414 1.2279-1.2732 2.8943-1.9317 4.9555-1.9317 2.0173 0 3.64.6146 4.8679 1.8439 1.228 1.2292 1.8419 2.8536 1.8419 4.961v.7024h-8.3763c0 .7902.1754 1.361.4386 1.756.2631.3952.7455.5708 1.491.5708 1.0525-.0439 1.6665-.5707 1.8858-1.5805zm-.3507-3.2487c0-.8342-.1755-1.405-.5263-1.7122-.3508-.3074-.7455-.439-1.228-.439-1.1402 0-1.7541.7024-1.7541 2.1512h3.5084zM190.679 27.6488h-4.6924V15.1366h4.0785v2.5902c.4824-1.8878 1.5349-2.8097 3.2452-2.8097.1755 0 .3947 0 .7017.0439v4.3902c-.3508-.0878-.6578-.1317-.921-.1317-1.6226 0-2.4558.922-2.4558 2.722v5.7073h.0439zM203.8793 23.1707l4.561.3073c-.2632 1.2293-.9649 2.283-2.0613 3.161-1.0963.878-2.6312 1.3171-4.517 1.3171-2.105 0-3.7715-.6146-5.0433-1.8439-1.2718-1.2293-1.8857-2.722-1.8857-4.522 0-1.8878.614-3.4682 1.8419-4.7414 1.2279-1.2732 2.8944-1.9317 4.9555-1.9317 2.0174 0 3.64.6146 4.868 1.8439 1.2279 1.2292 1.8418 2.8536 1.8418 4.961v.7024h-8.3762c0 .7902.1754 1.361.4385 1.756.2631.3952.7455.5708 1.491.5708 1.0526-.0439 1.7104-.5707 1.8858-1.5805zm-.307-3.2487c0-.8342-.1754-1.405-.5262-1.7122-.3508-.3074-.7455-.439-1.228-.439-1.1402 0-1.7541.7024-1.7541 2.1512h3.5083zM222.6053 27.6488h-4.9117v-7.9025c0-.6585-.0877-1.0536-.307-1.2292-.2193-.1756-.4386-.2634-.7455-.2634-.8771 0-1.3595.6146-1.3595 1.8878v7.5512h-4.9118V15.1366h4.561v1.756c.6577-1.3609 1.8857-2.0194 3.596-2.0194.921 0 1.6665.1756 2.3243.5268.614.3512 1.0964.7902 1.3595 1.361.2631.5707.3947 1.5366.3947 2.8975v7.9903z'/></g></svg></a>",
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
