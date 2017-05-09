export class Config {
    public static SCHEMA_SEARCH_FORM = {
        'type': 'object',
        'widget': 'widget-settings',
        'properties': {
            'general': {
                'type': 'object',
                'properties': {
                    'destination': {
                        'type': 'string',
                        'minLength': 2,
                        'maxLength': 32,
                        'description': 'URL resultatenpagina'
                    },
                    'new_window': {
                        'type': 'boolean',
                        'description': 'Open in een nieuw venster ?'
                    },
                    'button_label': {
                        'type': 'string',
                        'minLength': 2,
                        'description': 'Label zoekknop',
                    }
                }
            },
            'header': {
                'type': 'object',
                'properties': {
                    'header': {
                        'type': 'string',
                        'widget': 'textarea',
                    }
                }
            },
            'footer': {
                'type': 'object',
                'properties': {
                    'footer': {
                        'type': 'string',
                        'widget': 'textarea',
                    }
                }
            }
        },
        'required': [],

        'panes': [
            {
                'fieldsets': ['general'],
                'title': 'Algemeen'
            },
            {
                'fieldsets': ['header'],
                'title': 'Header'
            },
            {
                'fieldsets': ['footer'],
                'title': 'Footer'
            }
        ],
    };

    public static SCHEMA_SEARCH_RESULTS = {
        'type': 'object',
        'widget': 'widget-settings',
        'properties': {
            'general': {
                'type': 'object',
                'properties': {
                    'destination': {
                        'type': 'string',
                        'minLength': 2,
                        'maxLength': 32,
                        'description': 'Tekstveld search results'
                    },
                    'new_window': {
                        'type': 'boolean',
                        'description': 'Open in een nieuw venster ?'
                    },
                    'button_label': {
                        'type': 'string',
                        'minLength': 2,
                        'description': 'Label zoekknop',
                    }
                }
            },
            'header': {
                'type': 'object',
                'properties': {
                    'header': {
                        'type': 'string',
                        'widget': 'textarea',
                    }
                }
            },
            'footer': {
                'type': 'object',
                'properties': {
                    'footer': {
                        'type': 'string',
                        'widget': 'textarea',
                    }
                }
            }
        },
        'required': [],

        'panes': [
            {
                'fieldsets': ['general'],
                'title': 'Algemeen'
            },
            {
                'fieldsets': ['header'],
                'title': 'Header'
            },
            {
                'fieldsets': ['footer'],
                'title': 'Footer'
            }
        ],
    };
}
