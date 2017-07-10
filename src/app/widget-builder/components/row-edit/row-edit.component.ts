import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationModalComponent } from "../../../core/modal/components/confirmation-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
  removeRow($event, index: number): void{
    // Show the confirmation modal
    let modal = this.modalService.open(ConfirmationModalComponent);
    let modalInstance = modal.componentInstance;

    modalInstance.title = 'REMOVE_ROW_MODAL_TITLE';
    modalInstance.message = 'REMOVE_ROW_MODAL_MESSAGE';

    // Emit the change event so the original event can bubble
    // This is needed here so we can stop the widget from being deselected
    this.rowChanged.emit({
      type: 'modal',
      originalEvent: $event
    });

    modal.result.then((result) => {
      // Remove the current row from the rows
      this.rows.splice(index, 1);

      // Emit the change (remove) event
      this.rowChanged.emit({
        type: 'remove',
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
  moveRow(index:number, $originalEvent, direction: number = RowEditComponent.ROW_DIRECTION_UP) {
    this.rows.splice(index + direction, 0, this.rows.splice(index, 1)[0]);

    // Emit the change (move) event
    this.rowChanged.emit({
      type: 'move',
      originalEvent: $originalEvent
    });
  }

  /**
   * Move a row down in the rows array.
   * @param $event
   * @param index
   */
  moveRowUp($event, index: number) {
    this.moveRow(index, $event);
  }

  /**
   * Move a row up in the rows array.
   * @param $event
   * @param index
   */
  moveRowDown($event, index: number) {
    this.moveRow(index, $event, RowEditComponent.ROW_DIRECTION_DOWN)
  }

}
