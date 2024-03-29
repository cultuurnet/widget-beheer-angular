import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { ckeditorConfig } from '../../../constants/ckeditor-config';
import { WidgetBuilderService } from '../../../services/widget-builder.service';
import { BaseWidgetEditDirective } from '../base-widget-edit.component';
import { QueryStringService } from 'app/widget-builder/services/query-string.service';

/**
 * Search widget edit form component.
 */
@Component({
  templateUrl: './search-form-widget-edit.component.html',
  providers: [QueryStringService],
})
export class SearchFormWidgetEditComponent extends BaseWidgetEditDirective {
  /**
   * Config for the ckdeditor in this component
   */
  public ckeditorConfig: any = ckeditorConfig;

  /**
   * SearchFormWidgetEditComponent constructor
   */
  constructor(
    public formBuilder: FormBuilder,
    public widgetBuilderService: WidgetBuilderService,
    public queryStringService: QueryStringService
  ) {
    super(formBuilder, widgetBuilderService, queryStringService);
  }

  /**
   * @inheritDoc
   */
  protected buildForm() {
    this.widgetEditForm = this.formBuilder.group({
      general: this.formBuilder.group({
        destination: [_.get(this.widget.settings, 'general.destination', '')],
        new_window: [_.get(this.settings, 'general.new_window', '')],
        button_label: [_.get(this.settings, 'general.button_label', '')],
      }),
      header: this.formBuilder.group({
        body: [_.get(this.settings, 'header.body')],
      }),
      type: this.formBuilder.group({
        keyword_search: this.formBuilder.group({
          enabled: [
            _.get(this.settings, 'fields.type.keyword_search.enabled', ''),
          ],
          label: [_.get(this.settings, 'fields.type.keyword_search.label', '')],
          placeholder: [
            _.get(this.settings, 'fields.type.keyword_search.placeholder', ''),
          ],
        }),
      }),
      location: this.formBuilder.group({
        keyword_search: this.formBuilder.group({
          enabled: [
            _.get(this.settings, 'fields.location.keyword_search.enabled', ''),
          ],
          label: [
            _.get(this.settings, 'fields.location.keyword_search.label', ''),
          ],
          placeholder: [
            _.get(
              this.settings,
              'fields.location.keyword_search.placeholder',
              ''
            ),
          ],
        }),
      }),
      time: this.formBuilder.group({
        date_search: this.formBuilder.group({
          enabled: [
            _.get(this.settings, 'fields.time.date_search.enabled', ''),
          ],
          label: [_.get(this.settings, 'fields.time.date_search.label', '')],
          placeholder: [
            _.get(this.settings, 'fields.time.date_search.placeholder', ''),
          ],
          options: this.formBuilder.group({
            today: [
              _.get(this.settings, 'fields.time.date_search.options.today', ''),
            ],
            tomorrow: [
              _.get(
                this.settings,
                'fields.time.date_search.options.tomorrow',
                ''
              ),
            ],
            weekend: [
              _.get(
                this.settings,
                'fields.time.date_search.options.weekend',
                ''
              ),
            ],
            days_7: [
              _.get(
                this.settings,
                'fields.time.date_search.options.days_7',
                ''
              ),
            ],
            days_14: [
              _.get(
                this.settings,
                'fields.time.date_search.options.days_14',
                ''
              ),
            ],
            days_30: [
              _.get(
                this.settings,
                'fields.time.date_search.options.days_30',
                ''
              ),
            ],
            custom_date: [
              _.get(
                this.settings,
                'fields.time.date_search.options.custom_date',
                ''
              ),
            ],
          }),
          default_option: [
            _.get(
              this.settings,
              'fields.time.date_search.default_option',
              'today'
            ),
          ],
        }),
      }),
      footer: this.formBuilder.group({
        body: [_.get(this.settings, 'footer.body', '')],
      }),
    });
  }

  /**
   * @inheritDoc
   */
  protected applyValuesToModel(values: any) {
    // Apply all values to the model
    // Groupfilter values are applied to the model and taken care of in their own component
    _.set(this.settings, 'general', _.get(values, 'general', {}));
    _.set(this.settings, 'header', _.get(values, 'header', {}));
    _.set(
      this.settings,
      'fields.type.keyword_search',
      _.get(values, 'type.keyword_search', {})
    );
    _.set(
      this.settings,
      'fields.location.keyword_search',
      _.get(values, 'location.keyword_search', {})
    );
    _.set(
      this.settings,
      'fields.time.date_search',
      _.get(values, 'time.date_search', {})
    );
    _.set(this.settings, 'footer', _.get(values, 'footer', {}));

    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }
}
