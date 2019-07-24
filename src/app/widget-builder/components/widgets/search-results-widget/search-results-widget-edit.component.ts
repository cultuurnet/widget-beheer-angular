import { Component } from '@angular/core';
import { AbstractWidgetEditComponent } from '../../../../core/widget/components/abstract-widget-edit-component';
import { FormBuilder } from '@angular/forms';
import { ckeditorConfig } from '../../../constants/ckeditor-config';
import * as _ from 'lodash';
import { WidgetBuilderService } from '../../../services/widget-builder.service';
import { BaseWidgetEditComponent } from '../base-widget-edit.component';
import { PublishPageConfirmationModalComponent } from '../../modal/publish-page-confirmation-modal.component';

/**
 * Search results widget edit form component.
 */
@Component({
  templateUrl: './search-results-widget-edit.component.html'
})



export class SearchResultsWidgetEditComponent extends BaseWidgetEditComponent {

  /**
   * Config for the ckdeditor in this component
   */
  public ckeditorConfig: any = ckeditorConfig;

  /**
   * The available image positions for the list items
   */
  public imagePositions: any = [
    {
      label: 'Left',
      value: 'left'
    },
    {
      label: 'Right',
      value: 'right',
    }
  ];

  /**
   * SearchResultsWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder, public widgetBuilderService: WidgetBuilderService) {
    super(formBuilder, widgetBuilderService);
  }

  /**
   * @inheritDoc
   */
  protected buildForm() {
    this.widgetEditForm = this.formBuilder.group({
      general: this.formBuilder.group({
        current_search: [_.get(this.settings, 'general.current_search')],
        exclude: this.formBuilder.group({
          long_term: [_.get(this.widget.settings, 'general.exclude.long_term', false)],
          permanent: [_.get(this.widget.settings, 'general.exclude.permanent', false)]
        })
      }),
      header: this.formBuilder.group({
        body: [_.get(this.settings, 'header.body', '')]
      }),
      items: this.formBuilder.group({
        type: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.type.enabled', '')]
        }),
        icon_vlieg: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.icon_vlieg.enabled', '')]
        }),
        icon_uitpas: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.icon_uitpas.enabled', '')]
        }),
        description: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.description.enabled', '')],
          characters: [_.get(this.widget.settings, 'items.description.characters', '')]
        }),
        when: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.when.enabled', '')],
          label: [_.get(this.widget.settings, 'items.when.label', '')]
        }),
        where: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.where.enabled', '')],
          label: [_.get(this.widget.settings, 'items.where.label', '')]
        }),
        organizer: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.organizer.enabled', '')],
          label: [_.get(this.widget.settings, 'items.organizer.label', '')]
        }),
        age: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.age.enabled', '')],
          label: [_.get(this.widget.settings, 'items.age.label', '')]
        }),
        audience: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.audience.enabled', '')],
          label: [_.get(this.widget.settings, 'items.audience.label', '')]
        }),
        language_icons: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.language_icons.enabled', '')]
        }),
        image: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.image.enabled', '')],
          width: [_.get(this.widget.settings, 'items.image.width', '')],
          height: [_.get(this.widget.settings, 'items.image.height', '')],
          default_image: [_.get(this.widget.settings, 'items.image.default_image', '')],
          position: [_.get(this.widget.settings, 'items.image.position', '')]
        }),
        labels: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.labels.enabled', '')],
          limit_labels: this.formBuilder.group({
            enabled: [_.get(this.widget.settings, 'items.limit_labels.enabled', '')],
            labels: [_.get(this.widget.settings, 'items.limit_labels.labels', '')]
          }),
        }),
        facilities: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.facilities.enabled', '')],
          label: [_.get(this.widget.settings, 'items.facilities.label', '')]
        }),
        read_more: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.read_more.enabled', '')],
          label: [_.get(this.widget.settings, 'items.read_more.label', '')]
        }),
      }),
      detail_page: this.formBuilder.group({
        map: [_.get(this.widget.settings, 'detail_page.map', '')],
        price_information: [_.get(this.widget.settings, 'detail_page.price_information', '')],
        contact_information: [_.get(this.widget.settings, 'detail_page.contact_information', '')],
        reservation_information: [_.get(this.widget.settings, 'detail_page.reservation_information', '')],
        language_switcher: [_.get(this.widget.settings, 'detail_page.language_switcher', '')],
        uitpas_benefits: [_.get(this.widget.settings, 'detail_page.uitpas_benefits', '')],
        share_buttons: [_.get(this.widget.settings, 'detail_page.share_buttons', '')],
        back_button: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.back_button.enabled', '')],
          label: [_.get(this.widget.settings, 'detail_page.back_button.label', '')],
          url: [_.get(this.widget.settings, 'detail_page.back_button.url', '')]
        }),
        icon_vlieg: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.icon_vlieg.enabled', '')]
        }),
        icon_uitpas: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.icon_uitpas.enabled', '')]
        }),
        description: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.description.enabled', '')],
          characters: [_.get(this.widget.settings, 'detail_page.description.characters', '')]
        }),
        when: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.when.enabled', '')],
          label: [_.get(this.widget.settings, 'detail_page.when.label', '')]
        }),
        where: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.where.enabled', '')],
          label: [_.get(this.widget.settings, 'detail_page.where.label', '')]
        }),
        organizer: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.organizer.enabled', '')],
          label: [_.get(this.widget.settings, 'detail_page.organizer.label', '')]
        }),
        age: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.age.enabled', '')],
          label: [_.get(this.widget.settings, 'detail_page.age.label', '')]
        }),
        audience: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.audience.enabled', '')],
          label: [_.get(this.widget.settings, 'detail_page.audience.label', '')]
        }),
        language_icons: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.language_icons.enabled', '')]
        }),
        image: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.image.enabled', '')],
          width: [_.get(this.widget.settings, 'detail_page.image.width', '')],
          height: [_.get(this.widget.settings, 'detail_page.image.height', '')],
          default_image: [_.get(this.widget.settings, 'detail_page.image.default_image', '')],
          position: [_.get(this.widget.settings, 'detail_page.image.position', '')]
        }),
        labels: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.labels.enabled', '')],
          limit_labels: this.formBuilder.group({
            enabled: [_.get(this.widget.settings, 'detail_page.limit_labels.enabled', '')],
            labels: [_.get(this.widget.settings, 'detail_page.limit_labels.labels', '')]
          }),
        }),
        facilities: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.facilities.enabled', '')],
          label: [_.get(this.widget.settings, 'detail_page.facilities.label', '')]
        }),
        articles: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.articles.enabled', true)],
          limit_publishers: [_.get(this.widget.settings, 'detail_page.articles.limit_publishers', false)],
          publishers: this.formBuilder.group({
              bill: [_.get(this.widget.settings, 'detail_page.publishers.bill', false)],
              bruzz: [_.get(this.widget.settings, 'detail_page.publishers.bruzz', false)],
              gva: [_.get(this.widget.settings, 'detail_page.publishers.gva', false)]
          }),
          label: [_.get(this.widget.settings, 'detail_page.articles.label', 'Lees ook')]
        })
      }),
      search_params: this.formBuilder.group({
        query: [_.get(this.widget.settings, 'search_params.query', '')],
        private: [_.get(this.widget.settings, 'search_params.private', false)],
        country: [_.get(this.widget.settings, 'search_params.country', 'BE')],
      }),
      footer: this.formBuilder.group({
        body: [_.get(this.settings, 'footer.body', '')]
      })
    });
  }

  /**
   * @inheritDoc
   */
  protected applyValuesToModel(values: any) {
    // Apply all values to the model
    _.set(this.settings, 'general', _.get(values, 'general', {}));
    _.set(this.settings, 'header', _.get(values, 'header', {}));
    _.set(this.settings, 'items', _.get(values, 'items', {}));
    _.set(this.settings, 'detail_page', _.get(values, 'detail_page', {}));
    _.set(this.settings, 'search_params', _.get(values, 'search_params', {}));
    _.set(this.settings, 'footer', _.get(values, 'footer', {}));

    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

}
