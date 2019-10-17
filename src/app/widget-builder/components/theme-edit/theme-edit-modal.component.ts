import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WidgetPage } from '../../../core/widget/widget-page';
import { WidgetService } from '../../../core/widget/services/widget.service';
import { WidgetBuilderService } from '../../services/widget-builder.service';

/**
 * ThemeEditModalComponent modal component.
 */
@Component({
  selector: 'app-theme-edit-modal',
  templateUrl: './theme-edit-modal.component.html'
})
export class ThemeEditModalComponent implements OnInit {

  /**
   * Indicates if the widget is being saved
   * @type {boolean}
   */
  public isSaving = false;

  /**
   * The widgetPage being edited
   */
  public widgetPage: WidgetPage;

  /**
   * Show/hide error message
   */
  public error = false;

  /**
   * ThemeEditModalComponent constructor.
   * @param activeModal
   * @param formBuilder
   * @param widgetService
   * @param widgetBuilderService
   */
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private widgetService: WidgetService,
    private widgetBuilderService: WidgetBuilderService
  ) { }

  /**
   * @inheritDoc
   */
  public ngOnInit() {

  }

  /**
   * Save Theme
   */
  public save() {
    this.isSaving = true;
    this.error = false;

    // Save the widget page (will trigger a render for the current widget)
    this.widgetService.saveWidgetPage(this.widgetPage).subscribe(() => {
      // Close modal
      this.activeModal.close(true);
    }, () => {
      this.isSaving = false;

      // Show error message in the modal
      this.error = true;
    });
  }

}
