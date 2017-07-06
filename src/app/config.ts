export class Config {
  public static EXAMPLE_PAGE = {
    'id': '1',
    'title': 'Page title',
    'uid': 'uid uitid user',
    'rows': [
      {
        'type': '2col-sidebar-left',
        'regions': {
          'sidebar_left': {
            'widgets': [
              {
                'type': 'search-form',
                'settings': {
                  'destination': 'https://www.uitinvlaanderen.be/agenda/search',
                  'new_window': false,
                  'button_label': 'Zoeken',
                  'search_query': 'q=mysearch',
                  'header': {
                    'body': 'Header text'
                  },
                  'fields': {
                    'what': {
                      'keyword_search': {
                        'show' : true,
                        'label': 'Wat',
                        'placeholder': 'Bv. concert, Bart Peeters,...',
                      },
                      'group_filters': [
                        {
                          'label': 'Group filter label',
                          'placeholder': 'Some placeholder',
                          'type': 'select_single',
                          'options': [
                            {
                              'label': 'Gent',
                              'query': 'zip=9000'
                            },
                          ]
                        },
                        {
                          'label': 'Some custom label',
                          'placeholder': 'Some placeholder',
                          'type': 'select_multiple',
                          'options': [
                            {
                              'label': 'Gent',
                              'query': 'zip=9000'
                            },
                          ]
                        }
                      ]
                    }
                  }
                }
              },
            ]
          },
          'content': {
            'widgets': [
              {
                'type': 'search-results',
                'settings': {
                  'header': {
                    'body': 'Header text'
                  },
                  'icon_vlieg': {
                    'show': true,
                    'label': 'Vlieg'
                  },
                  'icon_uitpas': {
                    'show': true,
                    'label': 'UitPas'
                  },
                  'description': {
                    'show': true,
                    'characters': 200
                  },
                  'when': {
                    'show': true,
                    'label': 'Wanneer'
                  },
                  'where': {
                    'show': true,
                    'label': 'Waar'
                  },
                  'age': {
                    'show': true,
                    'label': 'Leeftijd'
                  },
                  'language_icons': {
                    'show': true
                  },
                  'image': {
                    'show': true,
                    'width': 100,
                    'height': 80,
                    'show_default': true,
                    'position': 'left'
                  },
                  'read_more': {
                    'show': true,
                    'label': 'Lees verder'
                  },
                  'allowed_labels': 'Label 1, Label 2'
                }
              }
            ]
          }
        }
      },
      {
        'type': 'full-width',
        'regions': {
          'content': {
            'widgets': [
              {
                'type': 'search-results',
                'settings': {
                  'header': {
                    'body': 'Header text'
                  },
                  'icon_vlieg': {
                    'show': true,
                    'label': 'Vlieg'
                  },
                  'icon_uitpas': {
                    'show': true,
                    'label': 'UitPas'
                  },
                  'description': {
                    'show': true,
                    'characters': 200
                  },
                  'when': {
                    'show': true,
                    'label': 'Wanneer'
                  },
                  'where': {
                    'show': true,
                    'label': 'Waar'
                  },
                  'age': {
                    'show': true,
                    'label': 'Leeftijd'
                  },
                  'language_icons': {
                    'show': true
                  },
                  'image': {
                    'show': true,
                    'width': 100,
                    'height': 80,
                    'show_default': true,
                    'position': 'left'
                  },
                  'read_more': {
                    'show': true,
                    'label': 'Lees verder'
                  },
                  'allowed_labels': 'Label 1, Label 2'
                }
              }
            ]
          }
        }
      }
    ],
    'styling': {
      'css': '.widgets {}'
    }
  };
}
