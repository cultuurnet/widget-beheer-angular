import { Component, ComponentFactoryResolver, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Widget } from "../../../core/widget/widget";
import { WidgetBuilderService } from "../../services/widget-builder.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "../../../core/modal/components/confirmation-modal.component";
import { SearchFormWidgetPreviewComponent } from "./search-form-widget/search-form-widget-preview.component";
import { SearchResultsWidgetPreviewComponent } from "./search-results-widget/search-results-widget-preview.component";
import { WidgetPreviewDirective } from "../../directives/widget-preview.directive";

/**
 * A generic widget preview component.
 */
@Component({
  selector: 'app-widget-preview',
  templateUrl: './widget-preview.component.html'
})

/**
 * Component used for previewing a widget
 */
export class WidgetPreviewComponent implements OnInit, OnDestroy {

  /**
   * The widget being previewed
   */
  @Input() widget: Widget;

  /**
   * The widget preview directive to replace with the rendered widget preview component
   */
  @ViewChild(WidgetPreviewDirective) preview: WidgetPreviewDirective;

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
   * @param _componentFactoryResolver
   */
  constructor(private widgetBuilderService: WidgetBuilderService, private modalService: NgbModal, private _componentFactoryResolver: ComponentFactoryResolver) {
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
   * Temp on init code for the preview.
   */
  ngOnInit(): void {
    // Temp preview code.
    // @todo: Remove when no longer needed
    let previewComponent = null;
    if (this.widget.type == 'search-form') {
      previewComponent = SearchFormWidgetPreviewComponent;
    } else if (this.widget.type == 'search-results') {
      previewComponent = SearchResultsWidgetPreviewComponent;
    }

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(previewComponent);

    let viewContainerRef = this.preview.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
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