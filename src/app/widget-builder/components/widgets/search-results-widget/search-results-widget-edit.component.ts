import { Component } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ckeditorConfig } from '../../../constants/ckeditor-config';
import * as _ from 'lodash';
import { WidgetBuilderService } from '../../../services/widget-builder.service';
import { BaseWidgetEditDirective } from '../base-widget-edit.component';
import { QueryStringService } from 'app/widget-builder/services/query-string.service';
import { environment } from 'environments/environment';

/**
 * Search results widget edit form component.
 */
@Component({
  templateUrl: './search-results-widget-edit.component.html',
  providers: [QueryStringService],
})
export class SearchResultsWidgetEditComponent extends BaseWidgetEditDirective {
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
      value: 'left',
    },
    {
      label: 'Right',
      value: 'right',
    },
  ];

  /**
   * Get the publishers from the environment config
   */
  publishers: Array<string> = environment.publishers.split(',');

  selectedPublishers: Array<string> = [];

  /**
   * SearchResultsWidgetEditComponent constructor
   */
  constructor(
    public formBuilder: FormBuilder,
    public widgetBuilderService: WidgetBuilderService,
    public queryStringService: QueryStringService
  ) {
    super(formBuilder, widgetBuilderService, queryStringService);
  }

  public getPublisherLabel(publisher: string): string {
    switch (publisher.toLowerCase()) {
      case 'uit':
        return 'UiTinVlaanderen';
      case 'uitmetvlieg':
        return 'Vlieg';
      default:
        return publisher;
    }
  }

  /**
   * @inheritDoc
   */
  protected buildForm() {
    this.widgetEditForm = this.formBuilder.group({
      general: this.formBuilder.group({
        current_search: [_.get(this.settings, 'general.current_search')],
        exclude: this.formBuilder.group({
          long_term: [
            _.get(this.widget.settings, 'general.exclude.long_term', false),
          ],
          permanent: [
            _.get(this.widget.settings, 'general.exclude.permanent', false),
          ],
        }),
        labels_as_icons: this.formBuilder.group({
          enabled: [
            _.get(
              this.widget.settings,
              'general.labels_as_icons.enabled',
              false
            ),
          ],
        }),
        view: [_.get(this.widget.settings, 'general.view', 'list')],
        items: [_.get(this.widget.settings, 'general.items', 10)],
      }),
      header: this.formBuilder.group({
        body: [_.get(this.settings, 'header.body', '')],
      }),
      items: this.formBuilder.group({
        type: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.type.enabled', '')],
        }),
        theme: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.theme.enabled', '')],
        }),
        icon_vlieg: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'items.icon_vlieg.enabled', ''),
          ],
        }),
        icon_uitpas: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'items.icon_uitpas.enabled', ''),
          ],
        }),
        icon_museumpass: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'items.icon_museumpass.enabled', ''),
          ],
        }),
        icon_uitx: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.icon_uitx.enabled', '')],
        }),
        description: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'items.description.enabled', ''),
          ],
          characters: [
            _.get(this.widget.settings, 'items.description.characters', ''),
          ],
        }),
        price_information: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'items.price_information.enabled', ''),
          ],
        }),
        reservation_information: this.formBuilder.group({
          enabled: [
            _.get(
              this.widget.settings,
              'items.reservation_information.enabled',
              ''
            ),
          ],
        }),
        when: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.when.enabled', '')],
          label: [_.get(this.widget.settings, 'items.when.label', '')],
        }),
        where: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.where.enabled', '')],
          label: [_.get(this.widget.settings, 'items.where.label', '')],
        }),
        organizer: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.organizer.enabled', '')],
          label: [_.get(this.widget.settings, 'items.organizer.label', '')],
        }),
        age: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.age.enabled', '')],
          label: [_.get(this.widget.settings, 'items.age.label', '')],
        }),
        audience: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.audience.enabled', '')],
          label: [_.get(this.widget.settings, 'items.audience.label', '')],
        }),
        language_icons: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'items.language_icons.enabled', ''),
          ],
        }),
        image: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.image.enabled', '')],
          width: [_.get(this.widget.settings, 'items.image.width', '')],
          height: [_.get(this.widget.settings, 'items.image.height', '')],
          default_image: this.formBuilder.group({
            enabled: [
              _.get(
                this.widget.settings,
                'items.image.default_image.enabled',
                ''
              ),
            ],
            type: [
              _.get(this.widget.settings, 'items.image.default_image.type', ''),
            ],
          }),
          position: [_.get(this.widget.settings, 'items.image.position', '')],
        }),
        labels: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.labels.enabled', '')],
          limit_labels: this.formBuilder.group({
            enabled: [
              _.get(
                this.widget.settings,
                'items.labels.limit_labels.enabled',
                ''
              ),
            ],
            labels: [
              _.get(
                this.widget.settings,
                'items.labels.limit_labels.labels',
                ''
              ),
            ],
          }),
        }),
        facilities: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'items.facilities.enabled', ''),
          ],
          label: [_.get(this.widget.settings, 'items.facilities.label', '')],
        }),
        read_more: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.read_more.enabled', '')],
          label: [_.get(this.widget.settings, 'items.read_more.label', '')],
        }),
        editorial_label: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'items.editorial_label.enabled', true),
          ],
          limit_publishers: [
            _.get(
              this.widget.settings,
              'items.editorial_label.limit_publishers',
              false
            ),
          ],
          publishers: this.addPublishersControl('items', 'editorial_label'),
        }),
      }),
      detail_page: this.formBuilder.group({
        type: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.type.enabled', ''),
          ],
        }),
        theme: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.theme.enabled', ''),
          ],
        }),
        map: [_.get(this.widget.settings, 'detail_page.map', '')],
        price_information: [
          _.get(this.widget.settings, 'detail_page.price_information', ''),
        ],
        contact_information: [
          _.get(this.widget.settings, 'detail_page.contact_information', ''),
        ],
        reservation_information: [
          _.get(
            this.widget.settings,
            'detail_page.reservation_information',
            ''
          ),
        ],
        language_switcher: [
          _.get(this.widget.settings, 'detail_page.language_switcher', ''),
        ],
        uitpas_benefits: [
          _.get(this.widget.settings, 'detail_page.uitpas_benefits', ''),
        ],
        share_buttons: [
          _.get(this.widget.settings, 'detail_page.share_buttons', ''),
        ],
        back_button: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.back_button.enabled', ''),
          ],
          label: [
            _.get(this.widget.settings, 'detail_page.back_button.label', ''),
          ],
          url: [_.get(this.widget.settings, 'detail_page.back_button.url', '')],
        }),
        icon_vlieg: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.icon_vlieg.enabled', ''),
          ],
        }),
        icon_uitpas: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.icon_uitpas.enabled', ''),
          ],
        }),
        icon_museumpass: this.formBuilder.group({
          enabled: [
            _.get(
              this.widget.settings,
              'detail_page.icon_museumpass.enabled',
              ''
            ),
          ],
        }),
        icon_uitx: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.icon_uitx.enabled', ''),
          ],
        }),
        description: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.description.enabled', ''),
          ],
          characters: [
            _.get(
              this.widget.settings,
              'detail_page.description.characters',
              ''
            ),
          ],
        }),
        when: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.when.enabled', ''),
          ],
          label: [_.get(this.widget.settings, 'detail_page.when.label', '')],
        }),
        where: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.where.enabled', ''),
          ],
          label: [_.get(this.widget.settings, 'detail_page.where.label', '')],
        }),
        organizer: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.organizer.enabled', ''),
          ],
          label: [
            _.get(this.widget.settings, 'detail_page.organizer.label', ''),
          ],
        }),
        age: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'detail_page.age.enabled', '')],
          label: [_.get(this.widget.settings, 'detail_page.age.label', '')],
        }),
        audience: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.audience.enabled', ''),
          ],
          label: [
            _.get(this.widget.settings, 'detail_page.audience.label', ''),
          ],
        }),
        language_icons: this.formBuilder.group({
          enabled: [
            _.get(
              this.widget.settings,
              'detail_page.language_icons.enabled',
              ''
            ),
          ],
        }),
        image: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.image.enabled', ''),
          ],
          width: [_.get(this.widget.settings, 'detail_page.image.width', '')],
          height: [_.get(this.widget.settings, 'detail_page.image.height', '')],
          default_image: this.formBuilder.group({
            enabled: [
              _.get(
                this.widget.settings,
                'detail_page.image.default_image.enabled',
                ''
              ),
            ],
            type: [
              _.get(
                this.widget.settings,
                'detail_page.image.default_image.type',
                ''
              ),
            ],
          }),
          position: [
            _.get(this.widget.settings, 'detail_page.image.position', ''),
          ],
        }),
        videos: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.videos.enabled', ''),
          ],
        }),
        labels: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.labels.enabled', ''),
          ],
          limit_labels: this.formBuilder.group({
            enabled: [
              _.get(
                this.widget.settings,
                'detail_page.labels.limit_labels.enabled',
                ''
              ),
            ],
            labels: [
              _.get(
                this.widget.settings,
                'detail_page.labels.limit_labels.labels',
                ''
              ),
            ],
          }),
        }),
        facilities: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.facilities.enabled', ''),
          ],
          label: [
            _.get(this.widget.settings, 'detail_page.facilities.label', ''),
          ],
        }),
        articles: this.formBuilder.group({
          enabled: [
            _.get(this.widget.settings, 'detail_page.articles.enabled', true),
          ],
          limit_publishers: [
            _.get(
              this.widget.settings,
              'detail_page.articles.limit_publishers',
              false
            ),
          ],
          publishers: this.addPublishersControl('detail_page', 'articles'),
          label: [
            _.get(
              this.widget.settings,
              'detail_page.articles.label',
              'Lees ook'
            ),
          ],
        }),
      }),
      search_params: this.formBuilder.group({
        query: [_.get(this.widget.settings, 'search_params.query', '')],
        private: [_.get(this.widget.settings, 'search_params.private', false)],
        country: [_.get(this.widget.settings, 'search_params.country', 'BE')],
      }),
      footer: this.formBuilder.group({
        body: [_.get(this.settings, 'footer.body', '')],
      }),
    });
  }

  // method which loads the active publishers from the widget settings and handles the checbox states
  addPublishersControl(pageType, prop) {
    const activePublishers = this.widget.settings[pageType][prop].publishers;
    let selectedPublishers: Array<any> = [];
    if (this.publishers.length) {
      selectedPublishers = this.publishers.map((publisher) => {
        const active = activePublishers.includes(publisher);
        return this.formBuilder.control(active);
      });
    }
    return this.formBuilder.array(selectedPublishers);
  }

  updateSelectedPublishers(pageType, prop) {
    this.selectedPublishers = [];
    this.publishersArray(pageType, prop).controls.map((control, i) => {
      if (control.value) {
        this.selectedPublishers.push(this.publishers[i]);
      }
    });
    this.settings[pageType][prop].publishers = this.selectedPublishers;
  }

  publishersArray(pageType, prop) {
    return <FormArray>(
      this.widgetEditForm.get(
        `${pageType as string}.${prop as string}.publishers`
      )
    );
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
