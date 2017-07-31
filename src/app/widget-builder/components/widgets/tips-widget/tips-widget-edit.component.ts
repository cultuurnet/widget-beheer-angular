import { Component } from "@angular/core";
import { AbstractWidgetEditComponent } from "../../../../core/widget/components/abstract-widget-edit-component";
import { FormBuilder } from "@angular/forms";
import { WidgetBuilderService } from "../../../services/widget-builder.service";
import * as _ from "lodash";

/**
 * Tips widget edit form component.
 */
@Component({
  templateUrl: './tips-widget-edit.component.html'
})
export class TipsWidgetWidgetEditComponent extends AbstractWidgetEditComponent {

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
   * HtmlWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder, public widgetBuilderService: WidgetBuilderService) {
    super(formBuilder);
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
          cbdid: [_.get(this.widget.settings, 'general.detail_link.cbdid', '')],
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
          label: [_.get(this.widget.settings, 'items.description.label', '')],
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

    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

  /**
   * @inheritDoc
   */
  protected handleWidgetNameChanged(name: string) {
    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

}