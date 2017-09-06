import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Widget } from "../../../../core/widget/widget";
import { validJson } from "../../../../core/form/validators/json.directive";
import { WidgetBuilderService } from "../../../services/widget-builder.service";
import { ToastyService } from "ng2-toasty";
import { TranslateService } from "@ngx-translate/core";

/**
 * The json edit component allows direct editing of a widgets' JSON
 */
@Component({
  selector: 'app-json-edit',
  templateUrl: './json-edit.component.html'
})
export class JsonEditComponent implements OnInit {

  /**
   * The json edit form
   */
  public jsonEditForm: FormGroup;

  /**
   * Indicates if the widget is being saved
   */
  public isSaving: boolean = false;

  /**
   * The widget being edited
   */
  @Input() widget: Widget;

  /**
   * JsonEditComponent constructor
   */
  constructor(
    private formBuilder: FormBuilder,
    private widgetBuilderService: WidgetBuilderService,
    private toastyService: ToastyService,
    private translateService: TranslateService
  ) { }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this.buildForm();
  }

  /**
   * Build the dynamic form
   */
  protected buildForm() {
    this.jsonEditForm = this.formBuilder.group({
      json: [JSON.stringify(this.widget.settings, undefined, 4), [Validators.required, validJson]],
    });
  }

  /**
   * Apply the JSON to the widget settings and save the widget page
   */
  public saveJson() {
    this.disableForm();

    // Save the widget page (will trigger a render for the current widget)
    this.widgetBuilderService.saveWidgetSettings(this.widget.id, JSON.parse(this.jsonEditForm.get('json').value)).then(() => {
      // Update the form values
      this.jsonEditForm.get('json').patchValue(JSON.stringify(this.widget.settings, undefined, 4));

      this.enableForm();
      this.toastyService.success(this.translateService.instant('WIDGET_JSON_EDIT_SUCCESS_NOTIFICATION'));
    }).catch(() => {
      this.enableForm();
      this.toastyService.error(this.translateService.instant('WIDGET_JSON_EDIT_FAILED_NOTIFICATION'));
    });
  }

  /**
   * Disable the JSON edit form
   */
  private disableForm() {
    this.isSaving = true;
    this.jsonEditForm.get('json').disable();
  }

  /**
   * Enable the JSON edit form
   */
  private enableForm() {
    this.jsonEditForm.get('json').enable();
    this.isSaving = false;
  }

}
