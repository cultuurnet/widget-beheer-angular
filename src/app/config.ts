export class Config {
  public static EXAMPLE_PAGE = {
    'id': '1',
    'project_id': 'd1ae67d3-60a3-8f74-d64f-9c97c3afe6b6',
    'title': 'Page title',
    'uid': 'uid uitid user',
    'rows': [
      {
        'type': '2col-sidebar-left',
        'regions': {
          'sidebar_left': {
            'widgets': [
              {
                'id': 'd1ae67d3-60a3-8f74-d64f-9c97c3afe6b6',
                'type': 'search-form',
                'name': 'Zoekformulier',
                'settings': {
                  'general': {
                    'destination': 'https://www.uitinvlaanderen.be/agenda/search',
                    'new_window': false,
                    'button_label': 'Zoeken',
                    'search_query': 'q=mysearch',
                  },
                  'header': {
                    'body': 'Header text'
                  },
                  'fields': {
                    'type': {
                      'keyword_search': {
                        'enabled' : true,
                        'label': 'Wat',
                        'placeholder': 'Bv. concert, Bart Peeters,...',
                      },
                      'group_filters': {
                        'enabled': true,
                        'filters': [
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
                }
              },
            ]
          },
          'content': {
            'widgets': [
            ]
          }
        }
      },
      {
        'type': 'one-col',
        'regions': {
          'content': {
            'widgets': [
              {
                'id': '4fb36e4c-d2f3-55c6-b923-31bed556936b',
                'type': 'search-results',
                'name': 'Zoekresultaten-1',
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
