import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WidgetBuilderService } from '../../services/widget-builder.service';
import { Widget } from '../../../core/widget/widget';
import { validJson } from '../../../core/form/validators/json.directive';

/**
 * JsonEditModalComponent modal component.
 */
@Component({
  selector: 'app-json-edit-modal',
  template: './json-edit-modal.component.html'
})
export class JsonEditModalComponent implements OnInit {

  /**
   * The JSON edit form
   */
  public jsonEditForm: FormGroup;

  /**
   * Indicates if the widget is being saved
   * @type {boolean}
   */
  public isSaving = false;

  /**
   * The widget being edited
   */
  public widget: Widget;

  /**
   * Show/hide error message
   */
  public showError = false;

  /**
   * JsonEditModalComponent constructor.
   * @param activeModal
   * @param formBuilder
   * @param widgetBuilderService
   */
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private widgetBuilderService: WidgetBuilderService
  ) { }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this.jsonEditForm = this.formBuilder.group({
      json: [JSON.stringify(this.widget.settings, undefined, 4), [Validators.required, validJson]],
    });
  }

  /**
   * Apply the JSON to the widget settings and save the widget page
   */
  public saveJson() {
    this.isSaving = true;
    this.showError = false;

    // Save the widget page (will trigger a render for the current widget)
    this.widgetBuilderService.saveWidgetSettings(this.widget.id, JSON.parse(this.jsonEditForm.get('json').value)).then(() => {
      this.activeModal.close(true);
    }).catch(() => {
      this.isSaving = false;

      // Show error message in the modal
      this.showError = true;
    });
  }

}
