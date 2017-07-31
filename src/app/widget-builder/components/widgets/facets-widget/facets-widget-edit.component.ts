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

    this.widgetBuilderService.saveWigetPage(this.widget.id);
  }

}