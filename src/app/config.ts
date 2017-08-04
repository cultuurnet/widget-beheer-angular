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
              {
                'id': '3c6ae3ef-cc96-4e15-880b-a4a5b5289fef',
                'type': 'facets',
                'name': 'Zoekverfijningen',
                'settings': {
                  'search_results': 'c039e4b6-3d61-1c2a-d028-4606fa56c4c9',
                  'filters': {
                    'what': true,
                    'where': true,
                    'when': false,
                  },
                  'group_filters': {
                    'enabled': true,
                    'filters': [
                      {
                        'label': 'Group filter label',
                        'type': 'link',
                        'options': [
                          {
                            'label': 'Gent',
                            'query': 'zip=9000'
                          },
                        ]
                      },
                      {
                        'label': 'Some custom label',
                        'type': 'link',
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
              },
              {
                'id': 'c039e4b6-3d61-1c2a-d028-4606fa56c4c9',
                'type': 'search-results',
                'name': 'Zoekresultaten',
                'settings': {
                  'general': {
                    'current_search': true,
                  },
                  'items': {
                    'icon_vlieg': {
                      'enabled': true
                    },
                    'icon_uitpas': {
                      'enabled': true
                    },
                    'description': {
                      'enabled': true,
                      'characters': 200
                    },
                    'when': {
                      'enabled': false,
                      'label': 'Wanneer'
                    },
                    'where': {
                      'enabled': true,
                      'label': 'Waar'
                    },
                    'age': {
                      'enabled': true,
                      'label': 'Leeftijd'
                    },
                    'language_icons': {
                      'enabled': false
                    },
                    'image': {
                      'enabled': true,
                      'width': 100,
                      'height': 80,
                      'default_image': true,
                      'position': 'left'
                    },
                    'labels': {
                      'enabled': false,
                      'limit_labels': {
                        'enabled': false,
                      }
                    },
                    'read_more': {
                      'enabled': true,
                      'label': 'Lees verder'
                    },
                  },
                  'detail_page': {
                    'price_information': true,
                    'share_buttons': true,
                    'back_button': {
                      'enabled': true,
                      'label': 'Volledig aanbod'
                    },
                    'icon_vlieg': {
                      'enabled': true
                    },
                    'icon_uitpas': {
                      'enabled': true
                    },
                    'when': {
                      'enabled': false,
                      'label': 'Wanneer'
                    },
                    'where': {
                      'enabled': true,
                      'label': 'Waar'
                    },
                    'age': {
                      'enabled': true,
                      'label': 'Leeftijd'
                    },
                    'language_icons': {
                      'enabled': false
                    },
                    'image': {
                      'enabled': true,
                      'width': 100,
                      'height': 80,
                      'default_image': true,
                      'position': 'left'
                    },
                    'labels': {
                      'enabled': false,
                      'limit_labels': {
                        'enabled': false,
                      }
                    }
                  }
                }
              },
              {
                'id': 'my-id',
                'type': 'tips',
                'name': 'My custom name',
                'settings': {
                  'general': {
                    'items': 3,
                    'detail_link': {
                      'enabled': false,
                      'cbdid': 'query_string'
                    }
                  },
                  'items': {
                    'icon_vlieg': {
                      'enabled': true
                    },
                    'icon_uitpas': {
                      'enabled': true
                    },
                    'description': {
                      'enabled': true,
                      'characters': 200
                    },
                    'when': {
                      'enabled': false,
                      'label': 'Wanneer'
                    },
                    'where': {
                      'enabled': true,
                      'label': 'Waar'
                    },
                    'age': {
                      'enabled': true,
                      'label': 'Leeftijd'
                    },
                    'language_icons': {
                      'enabled': false
                    },
                    'image': {
                      'enabled': true,
                      'width': 100,
                      'height': 80,
                      'default_image': true,
                      'position': 'left'
                    },
                    'labels': {
                      'enabled': false,
                      'limit_labels': {
                        'enabled': false,
                      }
                    },
                    'read_more': {
                      'enabled': true,
                      'label': 'Lees verder'
                    },
                  },
                  'search_params': {
                    'query': '?=somevar'
                  }
                }
              }
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
