import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationModalComponent } from '../../../core/modal/components/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * The row edit component is a generic component for manipulating rows within an array.
 * It contains the actions (move up, move down, remove,...) that can be performed on a row.
 */
@Component({
  selector: 'app-row-edit',
  templateUrl: './row-edit.component.html',
})
export class RowEditComponent {

  public static readonly ROW_DIRECTION_UP = -1;
  public static readonly ROW_DIRECTION_DOWN = 1;

  /**
   * The rows
   */
  @Input() rows: any = [];

  /**
   * The index of the current row
   */
  @Input() index: number;

  /**
   * Modal title
   */
  @Input() modalTitle = 'REMOVE_ROW_DEFAULT_MODAL_TITLE';

  /**
   * Modal message
   */
  @Input() modalMessage = 'REMOVE_ROW_DEFAULT_MODAL_MESSAGE';

  /**
   * Row changed event emitter.
   * @type {EventEmitter}
   */
  @Output() rowChanged: EventEmitter<any> = new EventEmitter();

  /**
   * RowEditComponent constructor.
   * @param modalService
   */
  constructor(private modalService: NgbModal) {
  }

  /**
   * Remove the current row from the rows.
   * @param $event
   * @param index
   */
  public removeRow($event, index: number) {
    // Show the confirmation modal
    const modal = this.modalService.open(ConfirmationModalComponent);
    const modalInstance = modal.componentInstance;

    modalInstance.title = this.modalTitle;
    modalInstance.message = this.modalMessage;

    // Emit the change event so the original event can bubble
    // This is needed here so we can stop the widget from being deselected
    this.rowChanged.emit({
      action: 'confirm',
      originalEvent: $event
    });

    modal.result.then((result) => {
      // Remove the current row from the rows
      this.rows.splice(index, 1);

      // Emit the change (remove) event
      this.rowChanged.emit({
        action: 'remove',
        originalEvent: $event
      });
    }, (reason) => {
      // Do nothing on dismiss, because the row hasn't changed
    });
  }

  /**
   * Move a layout row up or down the page.
   * @param index
   * @param $originalEvent
   * @param direction
   */
  public moveRow(index: number, $originalEvent, direction: number = RowEditComponent.ROW_DIRECTION_UP) {
    this.rows.splice(index + direction, 0, this.rows.splice(index, 1)[0]);

    // Emit the change (move) event
    this.rowChanged.emit({
      action: 'move',
      originalEvent: $originalEvent
    });
  }

  /**
   * Move a row down in the rows array.
   * @param $event
   * @param index
   */
  public moveRowUp($event, index: number) {
    this.moveRow(index, $event);
  }

  /**
   * Move a row up in the rows array.
   * @param $event
   * @param index
   */
  public moveRowDown($event, index: number) {
    this.moveRow(index, $event, RowEditComponent.ROW_DIRECTION_DOWN);
  }

}
