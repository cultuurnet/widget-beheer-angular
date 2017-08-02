import { Injectable } from '@angular/core';
import { WidgetPage } from "../widget-page";
import * as _ from "lodash";
import { environment } from "../../../../environments/environment";
import { WidgetSaveResponse } from "../widget-save-response";
import { WidgetPageFactory } from "../factories/widget-page.factory";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { StaticCache } from "../../static-cache";

/**
 * Temporary service that mimics calls that should go to Silex
 */
@Injectable()
export class WidgetService {

  /**
   * WidgetService constructor.
   * @param http
   * @param widgetPageFactory
   * @param cache
   */
  constructor (private http: HttpClient, private widgetPageFactory: WidgetPageFactory, private cache: StaticCache) {
  }

  /**
   * Performs a save of the widget page.
   * Provide an optional triggering widget id to do a partial render.
   *
   * Returns a render of the triggeringWidget if provided.
   *
   * @param widgetPage
   * @param widgetId
   * @return {Observable<WidgetSaveResponse>}
   */
  public saveWidgetPage(widgetPage: WidgetPage, widgetId?: string) : Observable<WidgetSaveResponse> {
    let requestOptions = {
      params: new HttpParams()
    };

    if (widgetId) {
      requestOptions.params.set('render', widgetId);
    }

    return this.http.put(environment.apiUrl + 'test', widgetPage, requestOptions).do<WidgetSaveResponse>(widgetSaveReponse => {
      // Cache the response
      this.cache.put('widgetPage', [widgetSaveReponse.widgetPage.id], this.widgetPageFactory.create(widgetSaveReponse.widgetPage))
    });
  }

  /**
   * Get a widgetpage
   * @param pageId
   * @return {Observable<WidgetPage>}
   */
  public getWidgetPage(pageId: string) {
    const widgetPage = this.cache.get('widgetPage', [pageId], false);

    if (widgetPage) {
      console.log('fetch from cache');
      return Observable.of(widgetPage);
    }

    return this.http.get(environment.apiUrl + 'test')
      .map(widgetPage => this.widgetPageFactory.create(widgetPage))
      .do(widgetPage => {
      this.cache.put('widgetPage', [pageId], widgetPage);
    });
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
    const renderedWidget = this.cache.get('renderedWidgets', [widgetPageId, widgetId], false);

    // Cache hit and no reset
    if (renderedWidget && !reset) {
      return Promise.resolve({content: renderedWidget});
    }

    // Service request
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        let response = _self.fakeRenderResponse(widgetId);
        _self.cache.put('renderedWidgets', [widgetPageId, widgetId], response);

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
   * @return {Observable<Object>}
   */
  public getWidgetDefaultSettings(): Observable<Object> {
    return this.http.get(environment.apiUrl + 'widget-types');
  }
}
