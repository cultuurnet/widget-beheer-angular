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
import { UserService } from "../../../core/user/services/user.service";
import { TopbarService } from "../../../core/topbar/services/topbar.service";
import { BackButton } from "app/core/topbar/back-button";

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
  public widgetPages: Array<WidgetPage> = [];

  /**
   * Array containing all legacy widget pages
   */
  public legacyWidgetPages: Array<WidgetPage> = [];

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
   * @param topbarService
   */
  constructor(
    private widgetService: WidgetService,
    private modalService: NgbModal,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private topbarService: TopbarService
  ) { }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { widgetPages: Array<WidgetPage>, project: Project }) => {
        // Separate legacy and current widgets
        for (let widgetPage of data.widgetPages) {
          widgetPage.version >= environment.widgetApi.currentVersion ? this.widgetPages.push(widgetPage) : this.legacyWidgetPages.push(widgetPage);
        }

        // Get the project from the current route
        this.project = data.project;
      });

    // Update the topbar
    this.updateTopbar();
  }

  /**
   * Duplicate a widget page and redirect to the widget builder
   * @param widgetPage
   */
  public duplicateWidgetPage(widgetPage: WidgetPage) {
    // Clone the widget page
    let clone =  _.cloneDeep(widgetPage);

    // Remove the widgetPage id
    clone.id = '';
    clone.title = clone.title + ' (' + this.translateService.instant('DUPLICATE_WIDGET_PAGE_COPY') + ')';

    // Save the widget page and redirect
    this.widgetService.saveWidgetPage(clone).subscribe(widgetSaveResponse => {
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
   * Update the topbar
   */
  private updateTopbar() {
    // Add a back button
    this.topbarService.setBackButton(new BackButton(
      BackButton.TYPE_LINK,
      'TOPBAR_BACK_BUTTON_LABEL_PROJECTAANVRAGEN',
      environment.projectaanvraagDashboardUrl
    ));
  }

}
