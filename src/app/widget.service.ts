import { Injectable }           from '@angular/core';

import {Widget} from "./widget";
import {Config} from "./config";

@Injectable()
export class WidgetService {
    getWidgets() {
        return [
            new Widget('search_form', {
                'student': {
                    'firstName': 'first widget',
                    'lastName': 'Doe'
                },
                'placeOfBirth': {
                    'city': 'La gran Bilbao',
                    'country': 'belgium'
                },
                'mother': {
                    'firstName': 'Ana'
                },
                'sameAddress': true,
            }),
            new Widget('search_results', {
                'student': {
                    'firstName': 'Second widget',
                    'lastName': 'Doe'
                },
                'placeOfBirth': {
                    'city': 'La gran Bilbao',
                    'country': 'belgium'
                },
                'mother': {
                    'firstName': 'Ana'
                },
                'sameAddress': true,
            }),
        ];
    }
}
