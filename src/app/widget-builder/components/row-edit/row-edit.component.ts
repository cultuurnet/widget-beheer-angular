import { Component, Input, OnInit } from '@angular/core';
import { Layout } from "../../../core/layout/layout";
import { WidgetPage } from "../../../core/widget/widget-page";
import { WidgetBuilderService } from "../../services/widget-builder.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "../../../core/modal/components/confirmation-modal.component";

@Component({
  selector: 'app-row-edit',
  templateUrl: './row-edit.component.html',
})
export class RowEditComponent implements OnInit {

  public static readonly ROW_DIRECTION_UP = -1;
  public static readonly ROW_DIRECTION_DOWN = 1;

  @Input() row: Layout;

  /**
   * Reference to the widget page.
   */
  private widgetPage: WidgetPage;

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
  }

  /**
   * Remove a layout row from the page.
   * @param row
   */
  removeRow(row: Layout): void{
    let modal = this.modalService.open(ConfirmationModalComponent);
    let modalInstance = modal.componentInstance;

    modalInstance.title = 'Remove row';
    modalInstance.message = 'Are you sure you want tot remove this row and all its content?';

    // Remove row on confirmation
    modal.result.then(() => {
      this.widgetPage.removeRow(row);
    });
  }

  /**
   * Move a layout row up or down the page.
   * @param row
   * @param direction
   */
  moveRow(row: Layout, direction: number = RowEditComponent.ROW_DIRECTION_UP) {
    let index = this.widgetPage.rows.indexOf(row);
    if (index > -1) {
      this.widgetPage.rows.splice(index + direction, 0, this.widgetPage.rows.splice(index, 1)[0]);
    }
  }

  /**
   * Move a layout row up the page.
   * @param: row
   */
  moveRowUp(row: Layout) {
    this.moveRow(row);
  }

  /**
   * Move a layout row up the page.
   * @param row
   */
  moveRowDown(row: Layout) {
    this.moveRow(row, RowEditComponent.ROW_DIRECTION_DOWN)
  }

}
