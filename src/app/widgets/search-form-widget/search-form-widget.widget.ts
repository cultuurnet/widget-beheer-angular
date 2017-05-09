import {Widget} from '../../shared/widget';
import {SearchFormWidgetEditComponent} from './search-form-widget-edit.component';
import {Component} from '@angular/core';

/**
 * Provide a search form widget.
 */
export class SearchFormWidget implements Widget {

    public type = 'search_form';
    public editComponent = SearchFormWidgetEditComponent;

    constructor(public settings: any) {}

}
