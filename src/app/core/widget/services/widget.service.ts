import { Injectable } from '@angular/core';
import { WidgetPage } from "../widget-page";
import * as _ from "lodash";
import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../../environments/environment";
import { WidgetSaveResponse } from "../widget-save-response";

/**
 * Temporary service that mimics calls that should go to Silex
 */
@Injectable()
export class WidgetService {

  private cache: any = {
    renderedWidgets: {}
  };

  constructor (private http: Http) {
  }

  /**
   * Performs a save of the widget page.
   * Provide an optional triggering widget id to do a partial render.
   *
   * Returns a render of the triggeringWidget if provided.
   *
   * @param widgetPage
   * @param widgetId
   * @return {Promise<T>}
   */
  public saveWidgetPage(widgetPage: WidgetPage, widgetId?: string) : Observable<WidgetSaveResponse> {

    let requestOptions = new RequestOptions();
    requestOptions.params = new URLSearchParams();
    if (widgetId) {
      requestOptions.params.set('render', widgetId);
    }

    return this.http.put(environment.apiUrl + 'test', widgetPage, requestOptions)
        .map(res => res.json());
  }

  /**
   * Renders a widget in a given widget page.
   *
   * @param widgetPageId
   * @param widgetId
   * @param reset
   */
  public renderWidget(widgetPageId: string, widgetId: string, reset: boolean = false) {
    // @todo Implement the render request
    let _self = this;
    let renderedWidget = _.get(this.cache.renderedWidgets, [widgetPageId, widgetId], false);

    // Cache hit and no reset
    if (renderedWidget && !reset) {
      return Promise.resolve({content: renderedWidget});
    }

    // Service request
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        let response = _self.fakeRenderResponse(widgetId);
        _.set(_self.cache.renderedWidgets, [widgetPageId, widgetId], response);

        resolve({content: response});
      }, _.random(1000, 3000));
    });
  }

  /**
   * Returns a fake render response
   * @todo: Remove
   *
   * @param widgetId
   * @returns {string}
   */
  private fakeRenderResponse(widgetId: string) {
    let response = '';

    switch(widgetId) {
      case 'd1ae67d3-60a3-8f74-d64f-9c97c3afe6b6': {
        response = 'search form preview';
        break;
      }
      case 'c039e4b6-3d61-1c2a-d028-4606fa56c4c9': {
        response = 'search results preview';
        break;
      }
      default: {
        response = 'default widget preview';
        break;
      }
    }

    return response + ' ' + Math.random().toString(36).slice(2);
  }

  /**
   * Get the default settings for the given widget types.
   */
  public getWidgetDefaultSettings(): Observable<Object> {
    return this.http.get(environment.apiUrl + 'widget-types')
        .map(res => res.json());
  }
}
