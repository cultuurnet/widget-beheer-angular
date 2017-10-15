import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WidgetBuilderService } from '../../../services/widget-builder.service';
import * as _ from 'lodash';
import { BaseWidgetEditComponent } from '../base-widget-edit.component';

/**
 * Tips widget edit form component.
 */
@Component({
  templateUrl: './tips-widget-edit.component.html'
})
export class TipsWidgetWidgetEditComponent extends BaseWidgetEditComponent {

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
   * TipsWidgetWidgetEditComponent constructor
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
        items: [_.get(this.widget.settings, 'general.items', 3)],
        detail_link: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'general.detail_link.enabled', '')],
          url: [_.get(this.widget.settings, 'general.detail_link.url', '')],
          cdbid: [_.get(this.widget.settings, 'general.detail_link.cdbid', '')],
        })
      }),
      items: this.formBuilder.group({
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
        age: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.age.enabled', '')],
          label: [_.get(this.widget.settings, 'items.age.label', '')]
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
        read_more: this.formBuilder.group({
          enabled: [_.get(this.widget.settings, 'items.read_more.enabled', '')],
          label: [_.get(this.widget.settings, 'items.read_more.label', '')]
        }),
      }),
      search_params: this.formBuilder.group({
        query: [_.get(this.widget.settings, 'search_params.query', '')]
      })
    });
  }

  /**
   * @inheritDoc
   */
  protected applyValuesToModel(values: any) {
    // Apply all values to the model
    _.set(this.settings, 'general', _.get(values, 'general', {}));
    _.set(this.settings, 'items', _.get(values, 'items', {}));
    _.set(this.settings, 'search_params', _.get(values, 'search_params', {}));

    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

}
