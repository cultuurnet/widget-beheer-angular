import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Widget } from "../../core/widget/widget";
import { WidgetPage } from "../../core/widget/widget-page";
import { WidgetService } from "../../core/widget/services/widget.service";
import { WidgetPreview } from "../components/widgets/widget-preview";
import * as debouncePromise from "debounce-promise"

/**
 * The widgetbuilder service.
 * Used tracking the active widget, widget preview,... and performing operations on the widget page.
 */
@Injectable()
export class WidgetBuilderService {

  /**
   * Keep track of the widgetPage that is being edited in the builder
   */
  public widgetPage: WidgetPage;

  /**
   * Widget selected subject
   * @type {Subject<Widget>}
   */
  private widgetSelected = new Subject<Widget>();

  /**
   * Observable selected widget
   */
  public widgetSelected$ = this.widgetSelected.asObservable();

  /**
   * Keep track of the active widget in the widget builder
   */
  private activeWidget: Widget;

  /**
   * Widget preview subject
   * @type {Subject}
   */
  private widgetPreview = new Subject<WidgetPreview>();

  /**
   * Observable widget preview
   */
  public widgetPreview$ = this.widgetPreview.asObservable();

  /**
   * Debounce the widgetpage save
   */
  private debounceWidgetPageSave;

  /**
   * WidgetBuilderService constructor
   * @param widgetService
   */
  constructor(private widgetService: WidgetService) {
    // Debounce all widgetpage save calls for 500ms
    this.debounceWidgetPageSave = debouncePromise(this.widgetPageSaveDebounced, 500);
  }

  /**
   * Get the currently active widget
   */
  public getActiveWidget() {
    return this.activeWidget;
  }

  /**
   * Update the widget selected subject with the selected widget
   * @param widget
   */
  public selectWidget(widget?: Widget) {
    this.activeWidget = widget;

    // Update the observable
    this.widgetSelected.next(widget);
  }

  /**
   * Save the currently active widget page.
   * Provide an optional triggering widget id to do a partial render.
   *
   * Returns a render of the triggeringWidget if provided.
   *
   * @param widgetId
   */
  public saveWigetPage(widgetId?: string) {
    let _self = this;

    if (widgetId) {
      this.lockWidgetPreview(widgetId);
    }

    this.debounceWidgetPageSave(widgetId).then(response => {
      console.log(response);
      // Update the widget preview with the new render response
      if (widgetId) {
        _self.widgetPreview.next({
          widgetId: widgetId,
          content: response['preview']
        });
      }
    }).catch((ex) => {
      console.error('Error saving the widget page', ex);
    });

  }

  /**
   * Debounced widget page save
   * @param widgetId
   */
  private widgetPageSaveDebounced(widgetId?: string) {
    return new Promise((resolve, reject) => {
      // Debounce the widget page save
      this.widgetService.saveWidgetPage(this.widgetPage, widgetId).subscribe(
        response => {
          resolve(response);
        },
        error => console.error('Error saving the widget page', error)
      );
    });
  }

  /**
   * Renders a widget for the currently active widget page.
   *
   * @param widgetId
   */
  public renderWidget(widgetId: string) {
    let _self = this;
    this.lockWidgetPreview(widgetId);

    // Render the widget
    this.widgetService.renderWidget(this.widgetPage.id, widgetId).then(response => {
      // Update the widget preview with the new render response
      _self.widgetPreview.next({
        widgetId: widgetId,
        content: response['content']
      });
    }).catch((ex) => {
      console.error('Error fetching the rendered widget', ex);
    });
  }

  /**
   * Locks the widget preview and shows throbber
   * @param widgetId
   */
  public lockWidgetPreview(widgetId: string) {
    // Trigger an update of the preview with empty content
    this.widgetPreview.next({
      widgetId: widgetId,
      content: '',
    });
  }

}
