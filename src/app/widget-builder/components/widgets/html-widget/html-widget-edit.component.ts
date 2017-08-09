import { Component } from "@angular/core";
import { AbstractWidgetEditComponent } from "../../../../core/widget/components/abstract-widget-edit-component";
import { FormBuilder } from "@angular/forms";
import { ckeditorConfig } from "../../../constants/ckeditor-config";
import { WidgetBuilderService } from "../../../services/widget-builder.service";
import * as _ from "lodash";

/**
 * Html widget edit form component.
 */
@Component({
  templateUrl: './html-widget-edit.component.html'
})
export class HtmlWidgetWidgetEditComponent extends AbstractWidgetEditComponent {

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
      content: this.formBuilder.group({
        body: [_.get(this.widget.settings, 'content.body', '')],
      })
    });
  }

  /**
   * @inheritDoc
   */
  protected applyValuesToModel(values: any) {
    // Apply all values to the model
    _.set(this.settings, 'content', _.get(values, 'content', {}));

    // Trigger widgetpage save
    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

  /**
   * @inheritDoc
   */
  public handleWidgetNameChanged(name: string) {
    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

}