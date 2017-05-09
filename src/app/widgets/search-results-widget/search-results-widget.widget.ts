import {Widget} from '../../shared/widget';
import {SearchResultsWidgetEditComponent} from './search-results-widget-edit.component';

/**
 * Provide a search results widget.
 */
export class SearchResultsWidget implements Widget {

    public editComponent = SearchResultsWidgetEditComponent;
    constructor(public settings: any) {}

}
