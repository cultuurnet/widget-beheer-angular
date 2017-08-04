import { Component, ComponentFactoryResolver, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Widget } from "../../../core/widget/widget";
import { WidgetBuilderService } from "../../services/widget-builder.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "../../../core/modal/components/confirmation-modal.component";
import { SearchFormWidgetPreviewComponent } from "./search-form-widget/search-form-widget-preview.component";
import { SearchResultsWidgetPreviewComponent } from "./search-results-widget/search-results-widget-preview.component";
import { WidgetPreviewDirective } from "../../directives/widget-preview.directive";
import * as _ from "lodash";
import { HtmlWidgetPreviewComponent } from "./html-widget/html-widget-preview.component";
import { TipsWidgetPreviewComponent } from "./tips-widget/tips-widget-preview.component";
import { FacetsWidgetPreviewComponent } from "./facets-widget/facets-widget-preview.component";

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
   * Rendered widget preview
   */
  public widgetPreview: string;

  /**
   * Indicates if the preview is rendering or not
   * @type {boolean}
   */
  public isRendering: boolean = true;

  /**
   * Keep track of the active widget
   */
  public activeWidget: Widget;

  /**
   * Subscription to the widget selected observable
   */
  private widgetSelectedSubscription;

  /**
   * Subscription to the widget preview observable
   */
  private widgetPreviewSubscription;

  /**
   * WidgetPreviewComponent constructor.
   * @param widgetBuilderService
   * @param modalService
   * @param _componentFactoryResolver
   */
  constructor(private widgetBuilderService: WidgetBuilderService, private modalService: NgbModal, private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  /**
   * Temp on init code for the preview.
   */
  ngOnInit(): void {
    // Subscribe to the selected widget
    this.widgetSelectedSubscription = this.widgetBuilderService.widgetSelected$.subscribe(widget => {
      this.activeWidget = widget;
    });

    // Set the current active widget
    this.activeWidget = this.widgetBuilderService.getActiveWidget();

    // Subscribe to the widget preview observable
    this.widgetPreviewSubscription = this.widgetBuilderService.widgetPreview$.subscribe(widgetPreview => {
      if (widgetPreview.widgetId === this.widget.id) {
        // If the content is empty, show the throbber and leave the old content (if any) as-is
        if (_.isEmpty(widgetPreview.content)) {
          this.isRendering = true;
        } else {
          // Rendering done, replace the content
          this.widgetPreview = widgetPreview.content;
          this.isRendering = false;
        }
      }
    });

    // Render the current widget
    this.widgetBuilderService.renderWidget(this.widget.id);

    // Temp preview code.
    // @todo: Remove when no longer needed
    let previewComponent = null;
    switch (this.widget.type) {
      case 'search-form':
        previewComponent = SearchFormWidgetPreviewComponent;
        break;
      case 'search-results':
        previewComponent = SearchResultsWidgetPreviewComponent;
        break;
      case 'html':
        previewComponent = HtmlWidgetPreviewComponent;
        break;
      case 'tips':
        previewComponent = TipsWidgetPreviewComponent;
        break;
      case 'facets':
        previewComponent = FacetsWidgetPreviewComponent;
        break;
      default:
        previewComponent = SearchFormWidgetPreviewComponent;
        break;
    }

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(previewComponent);

    let viewContainerRef = this.preview.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this.widgetSelectedSubscription.unsubscribe();
    this.widgetPreviewSubscription.unsubscribe();
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
    modal.result.then(() => {
      this.widgetBuilderService.widgetPage.removeWidget(widget);

      // Deselect active widget
      this.widgetBuilderService.selectWidget();

      // Save the widget page
      this.widgetBuilderService.saveWidgetPage();
    });
  }
}