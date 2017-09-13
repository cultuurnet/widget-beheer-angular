import { Injectable } from '@angular/core';
import { WidgetPage } from '../widget-page';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import { WidgetSaveResponse } from '../widget-save-response';
import { WidgetPageFactory } from '../factories/widget-page.factory';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { MemoryCache } from '../../memory-cache';
import { RenderedWidget } from '../rendered-widget';

/**
 * The widget service handles all request to the widget API
 * and provides an in-memory caching layer.
 */
@Injectable()
export class WidgetService {

  /**
   * The widget API path
   * @type {string}
   */
  private widgetApiPath = 'widgets/api/';

  /**
   * WidgetService constructor.
   * @param http
   * @param widgetPageFactory
   * @param cache
   */
  constructor (private http: HttpClient, private widgetPageFactory: WidgetPageFactory, private cache: MemoryCache) {
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
  public saveWidgetPage(widgetPage: WidgetPage, widgetId?: string): Observable<WidgetSaveResponse> {
    const requestOptions = {
      params: new HttpParams()
    };

    if (widgetId) {
      requestOptions.params = requestOptions.params.set('render', widgetId);
    }

    // Invalidate the widgetPageList cache for the given project id
    this.cache.clear('widgetPageList', [widgetPage.project_id]);

    return this.http.put(environment.apiUrl + this.widgetApiPath + 'project/' + widgetPage.project_id + '/widget-page', widgetPage, requestOptions)
      .do<WidgetSaveResponse>(widgetSaveReponse => {
        if (widgetSaveReponse.widgetPage) {
          // Cache the response
          this.cache.put('widgetPage', [widgetSaveReponse.widgetPage.id], this.widgetPageFactory.create(widgetSaveReponse.widgetPage));
        }
      });
  }

  /**
   * Get a single widget page
   *
   * @param project_id
   * @param pageId
   * @param reset
   * @return {Observable<WidgetPage>}
   */
  public getWidgetPage(project_id: string, pageId: string, reset: boolean = false): Observable<WidgetPage> {
    if (!reset) {
      const widgetPage = this.cache.get('widgetPage', [pageId], false);

      if (widgetPage) {
        return Observable.of(widgetPage);
      }
    }

    return this.http.get(environment.apiUrl + this.widgetApiPath + 'project/' + project_id + '/widget-page/' + pageId)
      .map(widgetPage => this.widgetPageFactory.create(widgetPage))
      .do(widgetPage => {
        this.cache.put('widgetPage', [pageId], widgetPage);
      });
  }

  /**
   * Delete a widget page
   *
   * @param widgetPage
   */
  public deleteWidgetPage(widgetPage: WidgetPage) {
    return this.http.delete(environment.apiUrl + this.widgetApiPath + 'project/' + widgetPage.project_id + '/widget-page/' + widgetPage.id)
      .do(reponse => {
        // Clear the widgetPageList cache for the given project
        this.cache.clear('widgetPageList', [widgetPage.project_id]);

        // Remove the widgetPage object from the cache
        this.cache.clear('widgetPage', [widgetPage.id]);
      });
  }

  /**
   * Get all widgetpages for a project
   *
   * @param projectId
   * @param reset
   * @return {Observable<Array<WidgetPage>>}
   */
  public getWidgetPages(projectId: string, reset: boolean = false): Observable<Array<WidgetPage>> {
    if (!reset) {
      const widgetPages = [];
      const widgetPageIds = this.cache.get('widgetPageList', [projectId], false);

      if (widgetPageIds) {
        // Get all the widgetPage objects from the widgetPage cache
        for (const widgetPageId of widgetPageIds) {
          const widgetPage = this.cache.get('widgetPage', [widgetPageId]);
          if (widgetPage) {
            widgetPages.push(widgetPage);
          }
        }

        // If not all widgetPages were found in the cache, fetch the new list from the API
        if (widgetPageIds.length === widgetPages.length) {
          return Observable.of(widgetPages);
        }
      }
    }

    return this.http.get(environment.apiUrl + this.widgetApiPath + 'project/' + projectId + '/widget-page')
      .map(widgetPages => {
        const pages = [];

        for (const id in widgetPages) {
          if (widgetPages.hasOwnProperty(id)) {
            const widgetPage: WidgetPage = this.widgetPageFactory.create(widgetPages[id]);
            if (widgetPage) {
              pages.push(widgetPage);
            }
          }
        }

        return pages;
      })
      .do(widgetPages => {
        // Store only the keys in the widgetPageList cache
        this.cache.put('widgetPageList', [projectId], _.map(widgetPages, 'id'));

        // Store all pages in the widgetPage cache
        for (const widgetPage of widgetPages) {
          this.cache.put('widgetPage', [widgetPage.id], widgetPage);
        }
      });
  }

  /**
   * Renders a widget in a given widget page.
   *
   * @param widgetPageId
   * @param widgetId
   * @param reset
   */
  public renderWidget(widgetPageId: string, widgetId: string, reset: boolean = false): Observable<RenderedWidget> {
    if (!reset) {
      const renderedWidget = this.cache.get('renderedWidgets', [widgetPageId, widgetId], false);
      if (renderedWidget) {
        return Observable.of(renderedWidget);
      }
    }

    return this.http.get(environment.apiUrl + this.widgetApiPath + 'render/' + widgetPageId + '/' + widgetId)
      .map(response => {
        return {
          widgetId: widgetId,
          data: response['data']
        };
      })
      .do(renderedWidget => {
      // Cache the rendered widget
      this.cache.put('renderedWidgets', [widgetPageId, widgetId], renderedWidget);
    });
  }

  /**
   * Get the default settings for the given widget types.
   * @param reset
   * @return {Observable<Object>}
   */
  public getWidgetDefaultSettings(reset: boolean = false): Observable<Object> {
    if (!reset) {
      const defaultSettings = this.cache.get('widgetDefaultSettings', ['settings'], false);

      if (defaultSettings) {
        return Observable.of(defaultSettings);
      }
    }

    return this.http.get(environment.apiUrl + this.widgetApiPath + 'widget-types').do(defaultSettings => {
      this.cache.put('widgetDefaultSettings', ['settings'], defaultSettings);
    });
  }

  /**
   * Get the widget page embed url
   *
   * @param widgetPage
   * @param scriptTags
   *  Wrap the url in script tags
   * @param currentVersion
   *  Force the embed url to the current version
   */
  public getWidgetPageEmbedUrl(widgetPage: WidgetPage, scriptTags: boolean = false, currentVersion: boolean = false): string {
    let embedUrl = environment.widgetApi.embedUrl.current;

    if (widgetPage.version !== environment.widgetApi.currentVersion && !currentVersion) {
      embedUrl = environment.widgetApi.embedUrl.legacy;
    }

    // Replace the :page_id placeholder
    embedUrl = _.replace(embedUrl, /:page_id/g, widgetPage.id);

    if (scriptTags) {
      return '<script type="text/javascript" src="' + embedUrl + '"></script>';
    }

    return embedUrl;
  }

}
