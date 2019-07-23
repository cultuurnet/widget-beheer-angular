import { Component } from '@angular/core';
import { ckeditorConfig } from '../../../constants/ckeditor-config';
import * as _ from 'lodash';
import { BaseWidgetEditComponent } from '../base-widget-edit.component';
import { FormBuilder } from '@angular/forms';
import { WidgetBuilderService } from '../../../services/widget-builder.service';
import { QueryStringService } from 'app/widget-builder/services/query-string.service';


/**
 * Html widget edit form component.
 */
@Component({
  templateUrl: './html-widget-edit.component.html',
  providers: [QueryStringService]
})
export class HtmlWidgetWidgetEditComponent extends BaseWidgetEditComponent {

  /**
   * Config for the ckdeditor in this component
   */
  public ckeditorConfig: any = ckeditorConfig;

  /**
   * HtmlWidgetWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder, public widgetBuilderService: WidgetBuilderService, public queryStringService: QueryStringService) {
    super(formBuilder, widgetBuilderService, queryStringService);
  }

  /**
   * @inheritDoc
   */
  protected buildForm() {
    this.widgetEditForm = this.formBuilder.group({
      content: this.formBuilder.group({
        body: [_.get(this.settings, 'content.body', '')],
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
