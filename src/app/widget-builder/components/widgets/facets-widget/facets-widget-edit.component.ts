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
      content: this.formBuilder.group({})
    });
  }

  /**
   * @inheritDoc
   */
  protected applyValuesToModel(values: any) {

  }

}