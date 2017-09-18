import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Widget } from '../../core/widget/widget';
import { WidgetPage } from '../../core/widget/widget-page';
import { WidgetService } from '../../core/widget/services/widget.service';
import * as debouncePromise from 'debounce-promise';
import { TranslateService } from '@ngx-translate/core';
import { RenderedWidget } from '../../core/widget/rendered-widget';
import * as _ from 'lodash';

/**
 * The widgetbuilder service.
 * Used for tracking the active widget, widget preview,... and performing operations on the widget page.
 */
@Injectable()
export class WidgetBuilderService {

  /**
   * The active widget page
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
  private widgetPreview = new Subject<RenderedWidget>();

  /**
   * Observable widget preview
   */
  public widgetPreview$ = this.widgetPreview.asObservable();

  /**
   * Widgetbuilder sidebar status
   * @type {Subject}
   */
  private sidebarStatus = new Subject<boolean>();

  /**
   * Observable widgetbuilder sidebar status
   */
  public sidebarStatus$ = this.sidebarStatus.asObservable();

  /**
   * Debounce the widgetpage save
   */
  private debounceWidgetPageSave;

  /**
   * WidgetBuilderService constructor
   * @param widgetService
   * @param translateService
   */
  constructor(private widgetService: WidgetService, private translateService: TranslateService) {
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
   * Save the settings of a single widget.
   * The settings of this widget in the currently active widget page are replaced upon success.
   *
   * @param widgetId
   * @param settings
   */
  public saveWidgetSettings(widgetId: string, settings: any): Promise<any> {
    console.log(settings);
    return new Promise((resolve, reject) => {
      // Clone the currently active widget page and apply the widget settings
      let widgetPageClone =  _.cloneDeep(this.widgetPage);
      let widget = widgetPageClone.findWidget(widgetId);

      // Apply the settings to the cloned widget
      if (widget) {
        widget.settings = settings;
      }

      this.widgetService.saveWidgetPage(widgetPageClone, widgetId).subscribe(
        response => {
          // Replace the widget settings with the settings from the response
          const responseWidget = response.widgetPage.findWidget(widgetId);
          let originalWidget = this.widgetPage.findWidget(widgetId);

          // Apply the settings to the cloned widget
          if (responseWidget && originalWidget) {
            for (const key in responseWidget.settings) {
              if (responseWidget.settings.hasOwnProperty(key)) {
                originalWidget.settings[key] = responseWidget.settings[key];
              }
            }
          }

          resolve(response);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  /**
   * Save the currently active widget page.
   * Provide an optional triggering widget id to do a partial render.
   *
   * Returns a render of the triggeringWidget if provided.
   *
   * @param widgetId
   */
  public saveWidgetPage(widgetId?: string) {
    const _self = this;

    if (widgetId) {
      this.lockWidgetPreview(widgetId);
    }

    this.debounceWidgetPageSave(this.widgetPage, widgetId).then(response => {
      // Update the widget preview with the new render response
      if (widgetId) {
        _self.widgetPreview.next({
          widgetId: widgetId,
          data: response.preview
        });
      }
    }).catch((ex) => {
      console.error('Error saving the widget page', ex);
    });
  }

  /**
   * Debounced widget page save
   *
   * @param widgetPage
   * @param widgetId
   */
  private widgetPageSaveDebounced(widgetPage: WidgetPage, widgetId?: string) {
    return new Promise((resolve, reject) => {
      // Debounce the widget page save
      this.widgetService.saveWidgetPage(widgetPage, widgetId).subscribe(
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
    const _self = this;
    this.lockWidgetPreview(widgetId);

    // Render the widget
    this.widgetService.renderWidget(this.widgetPage.id, widgetId).subscribe(widgetPreview => {
      // Update the widget preview with the new render response
      _self.widgetPreview.next(widgetPreview);
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
      data: '',
    });
  }

  /**
   * Generate a widget name
   * @param widgetType
   * @return Promise
   */
  public generateWidgetName(widgetType: any) {
    // Get the widget type count
    let numWidgets = 1;
    for (const rowKey in this.widgetPage.rows) {
      if (this.widgetPage.rows.hasOwnProperty(rowKey)) {
        for (const regionId in this.widgetPage.rows[rowKey].regions) {
          if (this.widgetPage.rows[rowKey].regions.hasOwnProperty(regionId)) {
            for (const widget of this.widgetPage.rows[rowKey].regions[regionId].widgets) {
              if (widget.type === widgetType.type) {
                numWidgets++;
              }
            }
          }
        }
      }
    }

    return this.translateService.instant(widgetType.label).replace(/\s+/g, '-').toLowerCase() + '-' + numWidgets;
  }

  /**
   * Toggle the widgetbuilder sidebar
   *  Pass in a boolean for the status (open or closed)
   */
  public toggleWidgetbuilderSidebar(status: boolean) {
    return this.sidebarStatus.next(status);
  }

  /**
   * Attach the widgetpage css to the document
   */
  public attachCss(css: string) {
    // Wrap in a try-catch because of possibly foul user input
    try {
      // Remove any previously attached styles
      this.removeCss();

      let styleElement = document.createElement("style");
      styleElement.setAttribute('class', 'widgetbuilder');

      // Webkit fix
      styleElement.appendChild(document.createTextNode(''));

      // Append the style element to the DOM
      document.head.appendChild(styleElement);
      let sheet = <CSSStyleSheet>styleElement.sheet;

      // Create a dummy document and element for parsing purposes
      const doc = document.implementation.createHTMLDocument("");
      let dummyElement = document.createElement("style");

      dummyElement.textContent = css;
      doc.body.appendChild(dummyElement);

      // Iterate the CSS rules, prefix and add them to the styles
      const rules = dummyElement.sheet['cssRules'];

      for(let i = 0 ; i < rules.length; i++){
        const rule = rules[i];

        // Media rules
        if (rule instanceof CSSMediaRule) {
          for (let ruleKey in rule.cssRules) {
            let mediaRule = rule.cssRules[ruleKey];
            if (mediaRule instanceof CSSStyleRule) {
              this.prefixCssStyleRule(mediaRule, '.widget-preview');
            }
          }
        } else if (rule instanceof CSSStyleRule) {
          this.prefixCssStyleRule(rule, '.widget-preview');
        }

        sheet.insertRule(rule.cssText);
      }
    }
    catch(err) {
      return false;
    }

    return true;
  }

  /**
   * Prefix a css style rule with
   * @param rule
   * @param prefix
   */
  private prefixCssStyleRule(rule: CSSStyleRule, prefix: string) {
    const selector = rule.selectorText;

    // Split on comma
    const selectors = selector.split(',');
    let prefixedSelectors = [];

    for (const s of selectors) {
      prefixedSelectors.push(prefix + ' ' + s);
    }

    // Prefix the selector if any
    // In case of no selector (animations, ...) leave the rule as is
    if (selector !== '' && !_.isNil(selector)) {
      rule.selectorText = prefixedSelectors.join();
    }

    return rule;
  }

  /**
   * Remove any widgetpage css attached to the DOM
   */
  public removeCss() {
    const styleSheets = document.head.getElementsByClassName('widgetbuilder');
    for (let i = 0; i < styleSheets.length; i++) {
      document.head.removeChild(styleSheets[i]);
    }
  }

}
