import { Component } from "@angular/core";
import { AbstractWidgetEditComponent } from "../../../../core/widget/components/abstract-widget-edit-component";
import { FormBuilder } from "@angular/forms";
import { ckeditorConfig } from "../../../constants/ckeditor-config";
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
   * Config for the ckdeditor in this component
   */
  public ckeditorConfig: any = ckeditorConfig;

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
        elements: [_.get(this.widget.settings, 'general.elements', 3)],
      })
    });
  }

  /**
   * @inheritDoc
   */
  protected applyValuesToModel(values: any) {

  }

}