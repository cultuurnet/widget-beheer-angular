import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WidgetBuilderService } from '../../../services/widget-builder.service';
import * as _ from 'lodash';
import { BaseWidgetEditComponent } from "../base-widget-edit.component";

/**
 * Facets widget edit form component.
 */
@Component({
  templateUrl: './facets-widget-edit.component.html'
})
export class FacetsWidgetWidgetEditComponent extends BaseWidgetEditComponent {

  /**x
   * Array of search results widgets in the page
   * @type {Array}
   */
  public searchResultsWidgets = [];

  /**
   * FacetsWidgetWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder, public widgetBuilderService: WidgetBuilderService) {
    super(formBuilder, widgetBuilderService);
  }

  /**
   * @inheritDoc
   */
  protected buildForm() {
    // Get all available search-result widgets
    this.searchResultsWidgets = this.getSearchResultsWidgets();

    this.widgetEditForm = this.formBuilder.group({
      search_results: [_.get(this.settings, 'search_results', '')],
      filters: this.formBuilder.group({
        what: [_.get(this.settings, 'filters.what', false)],
        where: [_.get(this.settings, 'filters.where', false)],
        when: [_.get(this.settings, 'filters.when', false)],
      }),
    });
  }

  /**
   * @inheritDoc
   */
  protected applyValuesToModel(values: any) {
    // Apply all values to the model
    // Groupfilter values are applied to the model and taken care of in their own component
    _.set(this.settings, 'filters', _.get(values, 'filters', {}));
    _.set(this.settings, 'search_results', _.get(values, 'search_results', ''));

    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

  /**
   * Get an array of search result widgets in the current widget page
   * @return {Array}
   */
  private getSearchResultsWidgets() {
    const searchResultsWidgets = [];

    for (const rowKey in this.widgetBuilderService.widgetPage.rows) {
      if (this.widgetBuilderService.widgetPage.rows.hasOwnProperty(rowKey)) {
        for (const regionId in this.widgetBuilderService.widgetPage.rows[rowKey].regions) {
          if (this.widgetBuilderService.widgetPage.rows[rowKey].regions.hasOwnProperty(regionId)) {
            for (const widget of this.widgetBuilderService.widgetPage.rows[rowKey].regions[regionId].widgets) {
              if (widget.type === 'search-results') {
                searchResultsWidgets.push(widget);
              }
            }
          }
        }
      }
    }

    return searchResultsWidgets;
  }

}
