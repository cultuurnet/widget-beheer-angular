import { Component } from "@angular/core";
import { AbstractWidgetEditComponent } from "../../../../core/widget/components/abstract-widget-edit-component";
import { FormBuilder } from "@angular/forms";
import { ckeditorConfig } from "../../../constants/ckeditor-config";
import * as _ from "lodash";

/**
 * Search results widget edit form component.
 */
@Component({
  templateUrl: './search-results-widget-edit.component.html'
})
export class SearchResultsWidgetEditComponent extends AbstractWidgetEditComponent {

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
  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }

  /**
   * @inheritDoc
   */
  protected buildForm() {
    this.widgetEditForm = this.formBuilder.group({
      general: this.formBuilder.group({
        current_search: [_.get(this.settings, 'general.current_search')]
      }),
      header: this.formBuilder.group({
        body: [_.get(this.settings, 'header.body')]
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

}