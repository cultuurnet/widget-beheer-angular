import { Component } from "@angular/core";
import { AbstractWidgetEditComponent } from "../../../../core/widget/components/abstract-widget-edit-component";
import { FormBuilder } from "@angular/forms";
import * as _ from "lodash";
import { ckeditorConfig } from "../../../constants/ckeditor-config";

/**
 * Search widget edit form component.
 */
@Component({
  templateUrl: './search-form-widget-edit.component.html'
})
export class SearchFormWidgetEditComponent extends AbstractWidgetEditComponent {

  /**
   * Config for the ckdeditor in this component
   */
  public ckeditorConfig: any = ckeditorConfig;

  /**
   * SearchFormWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }

  /**
   * @inheritDoc
   */
  protected buildForm() {
    this.widgetEditForm = this.formBuilder.group({
      general: this.formBuilder.group({
        destination: [_.get(this.settings, 'general.destination')],
        new_window: [_.get(this.settings, 'general.new_window')],
        button_label: [_.get(this.settings, 'general.button_label')],
        search_query: [_.get(this.settings, 'general.search_query')],
      }),
      header: this.formBuilder.group({
        body: [_.get(this.settings, 'header.body')]
      }),
      type: this.formBuilder.group({
        keyword_search: this.formBuilder.group({
          enabled: [_.get(this.settings, 'fields.type.keyword_search.enabled')],
          label: [_.get(this.settings, 'fields.type.keyword_search.label')],
          placeholder: [_.get(this.settings, 'fields.type.keyword_search.placeholder')]
        })
      }),
      place: this.formBuilder.group({
        keyword_search: this.formBuilder.group({
          enabled: [_.get(this.settings, 'fields.place.keyword_search.enabled')],
          label: [_.get(this.settings, 'fields.place.keyword_search.label')],
          placeholder: [_.get(this.settings, 'fields.place.keyword_search.placeholder')]
        })
      }),
      time: this.formBuilder.group({
        date_search: this.formBuilder.group({
          enabled: [_.get(this.settings, 'fields.time.date_search.enabled')],
          label: [_.get(this.settings, 'fields.time.date_search.label')],
          placeholder: [_.get(this.settings, 'fields.time.date_search.placeholder')]
        })
      }),
      footer: this.formBuilder.group({
        body: [_.get(this.settings, 'footer.body')]
      })
    });
  }

  /**
   * @inheritDoc
   */
  protected applyValuesToModel(values: any) {
    // Apply all values to the model
    // Groupfilter values are applied to the model and taken care of in their own component
    _.set(this.settings, 'general', _.get(values, 'general'));
    _.set(this.settings, 'header', _.get(values, 'header'));
    _.set(this.settings, 'fields.type.keyword_search', _.get(values, 'type.keyword_search'));
    _.set(this.settings, 'fields.place.keyword_search', _.get(values, 'place.keyword_search'));
    _.set(this.settings, 'fields.time.date_search', _.get(values, 'time.date_search'));
    _.set(this.settings, 'footer', _.get(values, 'footer'));
  }
}
