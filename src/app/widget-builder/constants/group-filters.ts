/**
 * Provides the default settings for the group filters
 * filter types (eg. single select, multiple select,...)
 */
export const group_filter_types = [
  {
    'label': 'LABEL_GROUP_FILTER_OPTION_SINGLE',
    'type': 'select_single',
    'default': true
  },
  {
    'label': 'LABEL_GROUP_FILTER_OPTION_AUTOCOMPLETE',
    'type': 'autocomplete',
    'default': false
  },
  {
    'label': 'LABEL_GROUP_FILTER_OPTION_MULTIPLE',
    'type': 'select_multiple',
    'default': false
  }
];
