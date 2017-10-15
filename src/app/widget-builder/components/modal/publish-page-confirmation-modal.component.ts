import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetPage } from '../../../core/widget/widget-page';
import { WidgetService } from '../../../core/widget/services/widget.service';

/**
 * Confirmation modal component.
 */
@Component({
  selector: 'app-publish-page-confirmation-modal',
  templateUrl: './publish-page-confirmation-modal.component.html'
})
export class PublishPageConfirmationModalComponent implements OnInit {

  /**
   * The widgetpage that was published
   */
  public widgetPage: WidgetPage;

  /**
   * The widgetPage embed code
   */
  public embedCode: string;

  /**
   * PublishPageConfirmationModalComponent constructor.
   * @param activeModal
   * @param widgetService
   */
  constructor(public activeModal: NgbActiveModal, private widgetService: WidgetService) {
  }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this.embedCode = this.widgetService.getWidgetPageEmbedUrl(this.widgetPage, true);
  }

}
