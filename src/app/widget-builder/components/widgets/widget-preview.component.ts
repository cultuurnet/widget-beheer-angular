import { Component, Input, OnDestroy } from "@angular/core";
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
export class WidgetPreviewComponent implements OnDestroy {

  /**
   * The widget being previewed
   */
  @Input() widget: Widget;

  /**
   * Keep track of the active widget
   */
  public activeWidget: Widget;

  /**
   * Subscription to the widget selected observable
   */
  private widgetSelectedSubscription;

  /**
   * WidgetPreviewComponent constructor.
   * @param widgetBuilderService
   * @param modalService
   */
  constructor(private widgetBuilderService: WidgetBuilderService, private modalService: NgbModal) {
    this.widgetSelectedSubscription = this.widgetBuilderService.widgetSelected$.subscribe(widget => {
      this.activeWidget = widget;
    });

    this.activeWidget = widgetBuilderService.getActiveWidget();
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this.widgetSelectedSubscription.unsubscribe();
  }

  /**
   * Start editing the given widget.
   * @param $event
   * @param widget
   */
  public editWidget($event, widget: Widget) {
    $event.stopWidgetDeselect = true;

    if (this.activeWidget !== widget) {
      this.widgetBuilderService.selectWidget(widget);
    }
  }

  /**
   * Remove a widget from the page.
   * @param widget
   */
  public removeWidget(widget: Widget) {
    let modal = this.modalService.open(ConfirmationModalComponent);
    let modalInstance = modal.componentInstance;

    modalInstance.title = 'REMOVE_WIDGET_MODAL_TITLE';
    modalInstance.message = 'REMOVE_WIDGET_MODAL_MESSAGE';

    // Remove row on confirmation
    modal.result.then((result) => {
      this.widgetBuilderService.widgetPage.removeWidget(widget);

      // Remove active widget
      this.widgetBuilderService.selectWidget();
    }, (reason) => {
      // Do nothing on cancel because the widget hasn't changed
    });
  }
}