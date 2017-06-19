import { Injectable } from '@angular/core';
import {WidgetTypeRegistry} from './shared/services/widget-type-registry.service';

import { environment } from '../environments/environment';

@Injectable()
export class WidgetService {

    constructor(private widgetTypeRegistry: WidgetTypeRegistry) {
    }

    getWidgets() {

        console.log(environment.apiUrl);

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
