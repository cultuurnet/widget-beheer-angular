import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WidgetPage } from '../widget-page';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import { WidgetSaveResponse } from '../widget-save-response';
import { WidgetPageFactory } from '../factories/widget-page.factory';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MemoryCache } from '../../memory-cache';
import { RenderedWidget } from '../rendered-widget';
import { CssStats } from "../css-stats";
import * as URI from 'urijs';

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

    return this.http.put(environment.apiUrl + this.widgetApiPath + 'project/' + widgetPage.project_id + '/widget-page', widgetPage, requestOptions).pipe(
      tap<WidgetSaveResponse>(widgetSaveReponse => {
        if (widgetSaveReponse.widgetPage) {
          // Parse the widget page
          const parsedWidgetPage = this.widgetPageFactory.create(widgetSaveReponse.widgetPage);
          widgetSaveReponse.widgetPage = parsedWidgetPage;

          // Cache the response
          this.cache.put('widgetPage', [widgetSaveReponse.widgetPage.id], parsedWidgetPage);
        }

        // Cache the render response if available
        if (widgetSaveReponse.preview && widgetId) {
          this.cache.put('renderedWidgets', [widgetPage.id, widgetId], {widgetId: widgetId, data: widgetSaveReponse.preview});
        }
      }));
  }

  /**
   * Publish a widgetpage
   *
   * @param widgetPage
   */
  public publishWidgetPage(widgetPage: WidgetPage) {
    return this.http.post(environment.apiUrl + this.widgetApiPath + 'project/' + widgetPage.project_id + '/widget-page/' + widgetPage.id + '/publish', {}).pipe(
      tap(res => {
        // Clear the widgetPageList cache for the given project
        this.cache.clear('widgetPageList', [widgetPage.project_id]);

        // Remove the widgetPage object from the cache
        this.cache.remove('widgetPage', [widgetPage.id]);
      }));
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
        return observableOf(widgetPage);
      }
    }

    return this.http.get(environment.apiUrl + this.widgetApiPath + 'project/' + project_id + '/widget-page/' + pageId).pipe(
      map(widgetPage => this.widgetPageFactory.create(widgetPage)),
      tap(widgetPage => {
        this.cache.put('widgetPage', [pageId], widgetPage);
      }));
  }

  /**
   * Delete a widget page
   *
   * @param widgetPage
   */
  public deleteWidgetPage(widgetPage: WidgetPage) {
    return this.http.delete(environment.apiUrl + this.widgetApiPath + 'project/' + widgetPage.project_id + '/widget-page/' + widgetPage.id).pipe(
      tap(reponse => {
        // Clear the widgetPageList cache for the given project
        this.cache.clear('widgetPageList', [widgetPage.project_id]);

        // Remove the widgetPage object from the cache
        this.cache.remove('widgetPage', [widgetPage.id]);
      }));
  }

  /**
   * Upgrade a widget page to latest version.
   *
   * @param widgetPage
   */
  public upgradeWidgetPage(widgetPage: WidgetPage) {
    return this.http.post(environment.apiUrl + this.widgetApiPath + 'project/' + widgetPage.project_id + '/widget-page/' + widgetPage.id + '/upgrade', {}).pipe(
        tap(reponse => {
          // Clear the widgetPageList cache for the given project
          this.cache.clear('widgetPageList', [widgetPage.project_id]);

          // Remove the widgetPage object from the cache
          this.cache.clear('widgetPage', [widgetPage.id]);
        }));
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
          return observableOf(widgetPages);
        }
      }
    }

    return this.http.get(environment.apiUrl + this.widgetApiPath + 'project/' + projectId + '/widget-page').pipe(
      map(widgetPages => {
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
      }),
      tap(widgetPages => {
        // Store only the keys in the widgetPageList cache
        this.cache.put('widgetPageList', [projectId], _.map(widgetPages, 'id'));

        // Store all pages in the widgetPage cache
        for (const widgetPage of widgetPages) {
          this.cache.put('widgetPage', [widgetPage.id], widgetPage);
        }
      }));
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
        return observableOf(renderedWidget);
      }
    }

    return this.http.get(environment.apiUrl + this.widgetApiPath + 'render/' + widgetPageId + '/' + widgetId + '/draft').pipe(
      map(response => {
        return {
          widgetId: widgetId,
          data: response['data']
        };
      }),
      tap(renderedWidget => {
      // Cache the rendered widget
      this.cache.put('renderedWidgets', [widgetPageId, widgetId], renderedWidget);
    }));
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
        return observableOf(defaultSettings);
      }
    }

    return this.http.get(environment.apiUrl + this.widgetApiPath + 'widget-types').pipe(tap(defaultSettings => {
      this.cache.put('widgetDefaultSettings', ['settings'], defaultSettings);
    }));
  }

  /**
   * Revert a draft widget page back to the published version.
   * @param widgetPage
   * @return {Observable<Object>}
   */
  public revertWidgetPage(widgetPage: WidgetPage): Observable<Object> {
    return this.http.post(environment.apiUrl + this.widgetApiPath + 'project/' + widgetPage.project_id + '/widget-page/' + widgetPage.id + '/revert', {}).pipe(
        tap(res => {
          // Clear the widgetPageList cache for the given project
          this.cache.clear('widgetPageList', [widgetPage.project_id]);

          // Remove the widgetPage object from the cache
          this.cache.remove('widgetPage', [widgetPage.id]);
        }));
  }

  /**
   * Get the widget page embed url
   *
   * @param widgetPage
   * @param scriptTags
   *  Wrap the url in script tags
   * @param forceCurrentVersion
   *  Force the embed url to the current version
   */
  public getWidgetPageEmbedUrl(widgetPage: WidgetPage, scriptTags: boolean = false, forceCurrentVersion: boolean = false): string {
    let embedUrl = environment.widgetApi_embedUrl_current;

    if (widgetPage.version !== Number(environment.widgetApi_currentVersion) && forceCurrentVersion) {
      embedUrl = environment.widgetApi_embedUrl_forceCurrent;
    }

    // Replace the :page_id placeholder
    embedUrl = _.replace(embedUrl, /:page_id/g, widgetPage.id);

    if (scriptTags) {
      return '<script type="text/javascript" src="' + embedUrl + '"></script>';
    }

    return embedUrl;
  }

  /**
   * Get css statistics for a given url
   *
   * @param url
   * @param reset
   * @return {Observable<CssStats>}
   */
  public getCssStats(url: string, reset: boolean = false): Observable<any> {
    // Cache per origin
    const scrapeURI = URI(url);
    const cacheKey = scrapeURI.origin();

    if (!reset) {
      const cssStats = this.cache.get('cssStats', [cacheKey], false);

      if (cssStats) {
        return observableOf(cssStats);
      }
    }

    // Request options
    const requestOptions = {
      params: new HttpParams()
    };

    requestOptions.params = requestOptions.params.set('url', url);

    return this.http.get(environment.apiUrl + this.widgetApiPath + 'css-stats', requestOptions).pipe(
      tap(cssStats => {
        this.cache.put('cssStats', [cacheKey], cssStats);
      }));
  }

}
