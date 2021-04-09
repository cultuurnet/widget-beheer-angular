import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetPage } from '../../../core/widget/widget-page';
import { WidgetService } from '../../../core/widget/services/widget.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Confirmation modal component.
 */
@Component({
  selector: 'app-admin-page-modal',
  template: './admin-page-modal.component.html'
})
export class AdminPageModalComponent implements OnInit {

  /**
   * The CSS edit form
   */
  public adminPageForm: FormGroup;

  /**
   * Indicates if the widget is being saved
   * @type {boolean}
   */
  public isSaving = false;

  /**
   * Indicates if the widget is being publishid
   * @type {boolean}
   */
  public publishing = false;

  /**
   * The widgetpage that was modified
   */
  public widgetPage: WidgetPage;

  public mobile;

  public jquery;

  /**
   * AdminPageModalComponent constructor.
   * @param activeModal
   * @param formBuilder
   * @param widgetService
   */
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private widgetService: WidgetService
  ) { }

  /**
   * @inheritDoc
   */
  public ngOnInit() {

    this.adminPageForm = this.formBuilder.group({
      mobile: this.widgetPage.mobile,
      jquery: this.widgetPage.jquery
    });
  }

  public save() {
    this.isSaving = true;
    this.publishing = true;


    // Apply the css to the widgetpage model
    this.widgetPage.mobile = this.adminPageForm.controls.mobile.value;
    this.widgetPage.jquery = this.adminPageForm.controls.jquery.value;

    // Save the widget page (will trigger a render for the current widget)
    this.widgetService.saveWidgetPage(this.widgetPage).subscribe(() => {
        this.isSaving = false;
        this.widgetService.publishWidgetPage(this.widgetPage).subscribe(() => {
          this.activeModal.close(true);
          this.publishing = false;
        }, () => {
          this.publishing = false;
        });
      }, () => {
        this.isSaving = false;
    });
  }

}
