import { Component, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Widget } from "../../../core/widget/widget";
import { WidgetBuilderService } from "../../services/widget-builder.service";
import { WidgetBuilderComponent } from "../../..//widget-builder/widget-builder.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "../../../core/modal/components/confirmation-modal.component";
import { WidgetPreviewDirective } from "../../directives/widget-preview.directive";
import * as _ from "lodash";
import { Subscription } from "rxjs";

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
  private widgetPreviewSubscription: Subscription;

  /**
   * Flag indicating if the sidebar is shown or not
   */
  public sidebar: boolean = false;

  /**
   * Subscription to the widgetbuilder sidebar status
   */
  private sidebarSubscription: Subscription;

  /**
   * WidgetPreviewComponent constructor.
   * @param widgetBuilderService
   * @param modalService
   */
  constructor(private widgetBuilderService: WidgetBuilderService, private modalService: NgbModal) {
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
    this.widgetPreviewSubscription = this.widgetBuilderService.widgetPreview$.subscribe(renderedWidget => {
      if (renderedWidget.widgetId === this.widget.id) {
        // If the content is empty, show the throbber and leave the old content (if any) as-is
        if (_.isEmpty(renderedWidget.data)) {
          this.isRendering = true;
        } else {
          // Rendering done, replace the content
          this.widgetPreview = renderedWidget.data;
          this.isRendering = false;
        }
      }
    });

    // Subscribe to the widgetbuilder sidebar status
    this.sidebarSubscription = this.widgetBuilderService.sidebarStatus$.subscribe(status => {
      this.sidebar = status;
    });

    // Render the current widget
    this.widgetBuilderService.renderWidget(this.widget.id);
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
   */
  public editWidget() {
    // Open the sidebar
    this.widgetBuilderService.toggleWidgetbuilderSidebar(true);
  }

  /**
   * Set selected for the given widget.
   * @param $event
   * @param widget
   */
  public selectWidget($event, widget: Widget) {
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
    }, (reason) => {
      // Do nothing on dismiss, because the row hasn't changed
    });
  }
}