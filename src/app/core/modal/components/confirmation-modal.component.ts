import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

/**
 * Confirmation modal component.
 */
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent {

  title: string;
  message: string;
  confirmButtonText: string = 'Yes';
  dismissButtonText: string = 'No';

  /**
   * ConfirmationModalComponent constructor.
   * @param activeModal
   */
  constructor(public activeModal: NgbActiveModal) {
  }

}
