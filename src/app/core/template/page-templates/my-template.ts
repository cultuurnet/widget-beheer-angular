import { PageTemplate } from "../pageTemplate";

export class MyTemplate implements PageTemplate {
  public title: string = 'My template';
  public description: string = 'Some random description for the template I just defined.';
  public configuration = {
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
                  }
                }
              }
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
    'styling': {}
  };
}