import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from "@angular/core";
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
export class WidgetPreviewComponent implements OnInit {

  /**
   * The widget being previewed
   */
  @Input() widget: Widget;

  @ViewChild(WidgetPreviewDirective) preview: WidgetPreviewDirective;

  /**
   * WidgetPreviewComponent constructor.
   * @param widgetBuilderService
   * @param modalService
   */
  constructor(private widgetBuilderService: WidgetBuilderService, private modalService: NgbModal, private _componentFactoryResolver: ComponentFactoryResolver) {
  }


  ngOnInit(): void {

    // Temp preview code.
    var previewComponent = null;
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
    this.widgetBuilderService.selectWidget(widget);
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

      // Remove active widget
      this.widgetBuilderService.selectWidget();
    });
  }
}