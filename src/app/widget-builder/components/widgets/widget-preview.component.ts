import { Component, Input } from "@angular/core";
import { Widget } from "../../../core/widget/widget";
import { WidgetBuilderService } from "../../services/widget-builder.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "../../../core/modal/components/confirmation-modal.component";

/**
 * A generic widget preview component.
 */
@Component({
  selector: 'app-widget-preview',
  templateUrl: './widget-preview.component.html'
})
export class WidgetPreviewComponent {

  public listen: boolean;

  /**
   * The widget being previewed
   */
  @Input() widget: Widget;

  /**
   * WidgetPreviewComponent constructor.
   * @param widgetBuilderService
   * @param modalService
   */
  constructor(private widgetBuilderService: WidgetBuilderService, private modalService: NgbModal) {
  }

  /**
   * Respond to a click outside the current component.
   * @param event
   */
  public onClickOutside(event:Object) {
    if(event && event['value'] === true) {
      console.log(event);
    }
  }

  /**
   * Remove a widget from the page.
   * @param widget
   */
  public removeWidget(widget: Widget) {
    let modal = this.modalService.open(ConfirmationModalComponent);
    let modalInstance = modal.componentInstance;

    modalInstance.title = 'Remove widget';
    modalInstance.message = 'Are you sure you want to remove this widget?';

    // Remove row on confirmation
    modal.result.then(() => {
      this.widgetBuilderService.widgetPage.removeWidget(widget);
    });
  }
}