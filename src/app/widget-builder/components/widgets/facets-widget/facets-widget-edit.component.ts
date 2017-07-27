import { Component } from "@angular/core";
import { AbstractWidgetEditComponent } from "../../../../core/widget/components/abstract-widget-edit-component";
import { FormBuilder } from "@angular/forms";
import { WidgetBuilderService } from "../../../services/widget-builder.service";
import * as _ from "lodash";

/**
 * Facets widget edit form component.
 */
@Component({
  templateUrl: './facets-widget-edit.component.html'
})
export class FacetsWidgetWidgetEditComponent extends AbstractWidgetEditComponent {

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
        options: this.formBuilder.group({
          what: [_.get(this.settings, 'general.options.what', false)],
          where: [_.get(this.settings, 'general.options.where', false)],
          when: [_.get(this.settings, 'general.options.when', false)],
          uitpas: [_.get(this.settings, 'general.options.uitpas', false)],
          vlieg: [_.get(this.settings, 'general.options.vlieg', false)],
          age: [_.get(this.settings, 'general.options.age', false)],
          free: [_.get(this.settings, 'general.options.free', false)]
        }),
      })
    });
  }

  /**
   * @inheritDoc
   */
  protected applyValuesToModel(values: any) {
    // Apply all values to the model
    // Groupfilter values are applied to the model and taken care of in their own component
    _.set(this.settings, 'general', _.get(values, 'general', {}));

    this.widgetBuilderService.saveWigetPage(this.widget.id);
  }

}