import { Injectable } from '@angular/core';

import {SearchFormWidget} from './widgets/search-form-widget/search-form-widget.widget';
import {SearchResultsWidget} from './widgets/search-results-widget/search-results-widget.widget';
import {WidgetTypeRegistry} from './shared/services/widget-type-registry.service';

@Injectable()
export class WidgetService {

    constructor(private widgetTypeRegistry: WidgetTypeRegistry) {
    }

    getWidgets() {

        let widgetOne = {
            type: 'search-form',
            settings: {
                'setting1': true,
                'setting2': false
            }
        };

        let widgetTwo = {
            type: 'search-results',
            settings: {
                'setting3': true,
                'setting4': false
            }
        };

        let widgets = [
            this.widgetTypeRegistry.getInstance(widgetOne),
            this.widgetTypeRegistry.getInstance(widgetTwo)
        ];

        return widgets.filter(function(n) { return n !== undefined; });
    }
}
