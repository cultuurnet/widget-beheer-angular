import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { WidgetPage } from "../../../core/widget/widget-page";
import * as _ from "lodash";
import { WidgetService } from "../../../core/widget/services/widget.service";
import { Project } from "../../../core/project/project";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "app/core/modal/components/confirmation-modal.component";
import { ToastyService } from "ng2-toasty";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../../../environments/environment";

/**
 * Displays a list of pages for a project.
 */
@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
})
export class PageListComponent implements OnInit {

  /**
   * Array containing all widget pages with the latest version
   */
  public widgetPages: Array<WidgetPage>;

  /**
   * Array containing all legacy widget pages
   */
  public legacyWidgetPages: Array<WidgetPage>;

  /**
   * The current project
   */
  public project: Project;

  /**
   * PageListComponent constructor.
   * @param widgetService
   * @param modalService
   * @param toastyService
   * @param route
   * @param router
   * @param translateService
   */
  constructor(
    private widgetService: WidgetService,
    private modalService: NgbModal,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) { }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { widgetPages: Array<WidgetPage>, project: Project }) => {
        const _self = this;

        // Filter the widget pages by version
        this.widgetPages = _.filter (data.widgetPages, function(widgetPage) {
          return widgetPage.version >= environment.widgetApi.currentVersion;
        });

        this.legacyWidgetPages = _.filter (data.widgetPages, function(widgetPage) {
          return widgetPage.version < environment.widgetApi.currentVersion;
        });

        // Get the project id from the current route
        this.project = data.project;
      });
  }

  /**
   * Duplicate a widget page and redirect to the widget builder
   * @param widgetPage
   */
  public duplicateWidgetPage(widgetPage: WidgetPage) {
    // Remove the widgetPage id
    widgetPage.id = '';

    // Save the widget page and redirect
    this.widgetService.saveWidgetPage(widgetPage).subscribe(widgetSaveResponse => {
      if (widgetSaveResponse.widgetPage) {
        this.router.navigate(['/project', this.project.id, 'page', widgetSaveResponse.widgetPage.id, 'edit']);
      }
    }, () => {
      this.toastyService.error(this.translateService.instant('DUPLICATE_WIDGET_PAGE_FAILED_NOTIFICATION'));
    });
  }

  /**
   * Delete a widget page
   * @param widgetPage
   */
  public deleteWidgetPage(widgetPage: WidgetPage) {
    let modal = this.modalService.open(ConfirmationModalComponent);
    let modalInstance = modal.componentInstance;

    modalInstance.title = 'REMOVE_WIDGET_PAGE_MODAL_TITLE';
    modalInstance.message = 'REMOVE_WIDGET_PAGE_MODAL_MESSAGE';

    modal.result.then((result) => {
      this.widgetService.deleteWidgetPage(widgetPage).subscribe(() => {
        // Remove the widget from the corresponding array, so the model gets updated
        let widgetPages = this.widgetPages;
        if (widgetPage.version < environment.widgetApi.currentVersion) {
          widgetPages = this.legacyWidgetPages;
        }

        const index = widgetPages.indexOf(widgetPage);
        if (index > -1) {
          widgetPages.splice(index, 1);
        }

        this.toastyService.success(this.translateService.instant('REMOVE_WIDGET_PAGE_SUCCESS_NOTIFICATION'));
      }, () => {
        this.toastyService.error(this.translateService.instant('REMOVE_WIDGET_PAGE_FAILED_NOTIFICATION'));
      });
    }, (reason) => {
      // Do nothing on modal close
    });
  }

  /**
   * Get the embed url/code for the widget page
   * @param widgetPage
   * @param tags
   * @param currentVersion
   */
  public getWidgetPageUrl(widgetPage: WidgetPage, tags: boolean = false, currentVersion: boolean = false) {
    return this.widgetService.getWidgetPageEmbedUrl(widgetPage, tags, currentVersion);
  }

  /**
   * Redirect the user back to their projectaanvraag dashboard
   */
  public backToDashboard() {
    return window.location.href = environment.projectaanvraagDashboardUrl;
  }

}
