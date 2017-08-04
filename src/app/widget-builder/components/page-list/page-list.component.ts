import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { WidgetPage } from "../../../core/widget/widget-page";
import * as _ from "lodash";

/**
 * Displays a list of pages for a project.
 */
@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
})
export class PageListComponent implements OnInit {

  /**
   * The current widget version
   */
  private currentWidgetVersion: number = 3;

  /**
   * Array containing all widget pages with the latest version
   */
  public widgetPages: Array<WidgetPage>;

  /**
   * Array containing all legacy widget pages
   */
  public legacyWidgetPages: Array<WidgetPage>;

  /**
   * The id of the current project
   */
  public projectId: string;

  /**
   * PageListComponent constructor.
   * @param route
   */
  constructor(private route: ActivatedRoute) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { widgetPages: Array<WidgetPage> }) => {
        const _self = this;

        // Filter the widget pages by version
        this.widgetPages = _.filter (data.widgetPages, function(widgetPage) {
          return widgetPage.version >= _self.currentWidgetVersion;
        });

        this.legacyWidgetPages = _.filter (data.widgetPages, function(widgetPage) {
          return widgetPage.version < _self.currentWidgetVersion;
        });

        // Get the project id from the current route
        this.projectId = this.route.snapshot.params['project_id'];
      });
  }

}
