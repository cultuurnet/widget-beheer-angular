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
      footer: this.formBuilder.group({
        body: [_.get(this.settings, 'footer.body')]
      })
    });
  }

}
