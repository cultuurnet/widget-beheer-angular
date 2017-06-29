import { Component, Input, OnInit } from '@angular/core';
import { Layout } from "../../../core/layout/layout";
import { WidgetPage } from "../../../core/widget/widget-page";
import { WidgetBuilderService } from "../../services/widget-builder.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "../../../core/modal/components/confirmation-modal.component";
import { Subscription } from "rxjs";

/**
 * The row edit component contains the actions (move up, move down, remove,...)
 * that can be performed on a widget page row.
 */
@Component({
  selector: 'app-row-edit',
  templateUrl: './row-edit.component.html',
})
export class RowEditComponent implements OnInit {

  public static readonly ROW_DIRECTION_UP = -1;
  public static readonly ROW_DIRECTION_DOWN = 1;

  /**
   * The row layout
   */
  @Input() row: Layout;

  /**
   * Reference to the widget page.
   */
  private widgetPage: WidgetPage;

  /**
   * Subscription widgetPageRows.
   */
  private widgetPageRows: Subscription;

  /**
   * Keep track of the index of the row.
   */
  public index: number;

  /**
   * Indicates if the current row is the first in the page.
   */
  public first: boolean;

  /**
   * Indicates if the current row is the last in the page.
   */
  public last: boolean;

  /**
   * WidgetBuilder constructor.
   * @param widgetBuilderService
   * @param modalService
   */
  constructor(private widgetBuilderService: WidgetBuilderService, private modalService: NgbModal) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.widgetPage = this.widgetBuilderService.widgetPage;

    // Track the index of the current row
    this.updateIndex();

    // Subscribe to the widgetPageRows observable
    this.widgetPageRows = this.widgetBuilderService.getWidgetPageRows().subscribe(row => {
      this.updateIndex();
    });
  }

  /**
   * Remove a layout row from the page.
   */
  removeRow(): void{
    let modal = this.modalService.open(ConfirmationModalComponent);
    let modalInstance = modal.componentInstance;

    modalInstance.title = 'Remove row';
    modalInstance.message = 'Are you sure you want to remove this row and all its content?';

    // Remove row on confirmation
    modal.result.then(() => {
      this.widgetPage.removeRow(this.row);
      this.updateObservableWigetPageRows();
    });
  }

  /**
   * Move a layout row up or down the page.
   * @param direction
   */
  moveRow(direction: number = RowEditComponent.ROW_DIRECTION_UP) {
    if (this.index > -1) {
      this.widgetPage.rows.splice(this.index + direction, 0, this.widgetPage.rows.splice(this.index, 1)[0]);
    }

    this.updateObservableWigetPageRows();
  }

  /**
   * Move a layout row up the page.
   */
  moveRowUp() {
    this.moveRow();
  }

  /**
   * Move a layout row up the page.
   */
  moveRowDown() {
    this.moveRow(RowEditComponent.ROW_DIRECTION_DOWN)
  }

  /**
   * Update the current component row index.
   */
  private updateIndex() {
    // Update the index
    this.index = this.widgetPage.rows.indexOf(this.row);
    this.first = this.index == 0;
    this.last = this.index == this.widgetPage.rows.length - 1;
  }

  /**
   * Update observable rows.
   */
  private updateObservableWigetPageRows() {
    this.widgetBuilderService.updateWidgetPageRows(this.row);
  }

}
