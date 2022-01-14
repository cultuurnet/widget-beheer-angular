import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Confirmation modal component.
 */
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  /**
   * The confirmation modal title
   */
  title: string;

  /**
   * The confirmation modal message
   */
  message: string;

  /**
   * The confirmation modal confirm button text
   */
  confirmButtonText = 'CONFIRMATION_MODAL_CONFIRM';

  /**
   * The confirmation modal dismiss/cancel button text
   */
  dismissButtonText = 'CONFIRMATION_MODAL_DISMISS';

  /**
   * ConfirmationModalComponent constructor.
   * @param activeModal
   */
  constructor(public activeModal: NgbActiveModal) {}
}
