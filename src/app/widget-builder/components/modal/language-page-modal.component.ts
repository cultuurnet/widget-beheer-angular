import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetPage } from '../../../core/widget/widget-page';
import { WidgetService } from '../../../core/widget/services/widget.service';

/**
 * Confirmation modal component.
 */
@Component({
  selector: 'app-language-page-modal',
  templateUrl: './language-page-modal.component.html'
})
export class LanguagePageModalComponent implements OnInit {


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

  /**
   * AdminPageModalComponent constructor.
   * @param activeModal
   * @param widgetService
   */
  constructor(
    public activeModal: NgbActiveModal,
    private widgetService: WidgetService
  ) { }

  /**
   * @inheritDoc
   */
  public ngOnInit() {

  }

  public save() {
    this.isSaving = true;
    this.publishing = true;


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
