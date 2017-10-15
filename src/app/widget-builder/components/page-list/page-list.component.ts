import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetPage } from '../../../core/widget/widget-page';
import * as _ from 'lodash';
import { WidgetService } from '../../../core/widget/services/widget.service';
import { Project } from '../../../core/project/project';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'app/core/modal/components/confirmation-modal.component';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../core/user/services/user.service';
import { TopbarService } from '../../../core/topbar/services/topbar.service';
import { BackButton } from 'app/core/topbar/back-button';

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

        this.buildWidgetPageList(data.widgetPages);

        // Get the project from the current route
        this.project = data.project;
      });

    // Init the topbar
    this.initTopbar();
  }

  /**
   * Duplicate a widget page and redirect to the widget builder
   * @param widgetPage
   */
  public duplicateWidgetPage(widgetPage: WidgetPage) {
    // Clone the widget page
    const clone =  _.cloneDeep(widgetPage);

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
    const modal = this.modalService.open(ConfirmationModalComponent);
    const modalInstance = modal.componentInstance;

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
   * Upgrade a widget page to latest version.
   * @param widgetPage
   */
  public upgradeWidgetPage(widgetPage: WidgetPage) {

    const modal = this.modalService.open(ConfirmationModalComponent);
    const modalInstance = modal.componentInstance;

    modalInstance.title = 'UPGRADE_WIDGET_PAGE_MODAL_TITLE';
    modalInstance.message = 'UPGRADE_WIDGET_PAGE_MODAL_MESSAGE';

    modal.result.then((result) => {
      this.widgetService.upgradeWidgetPage(widgetPage).subscribe(() => {

        this.reloadWidgetPageList();

        this.toastyService.success(this.translateService.instant('UPGRADE_WIDGET_PAGE_SUCCESS_NOTIFICATION'));
      }, () => {
        this.toastyService.error(this.translateService.instant('UPGRADE_WIDGET_PAGE_FAILED_NOTIFICATION'));
      });
    }, (reason) => {
      // Do nothing on modal close
    });
  }

  /**
   * Get the embed url/code for the widget page
   * @param widgetPage
   * @param tags
   * @param forceCurrentVersion
   */
  public getWidgetPageUrl(widgetPage: WidgetPage, tags: boolean = false, forceCurrentVersion: boolean = false) {
    return this.widgetService.getWidgetPageEmbedUrl(widgetPage, tags, forceCurrentVersion);
  }

  /**
   * Reload the current widget page list.
   */
  private reloadWidgetPageList() {

    this.widgetService.getWidgetPages(this.project.id).subscribe((widgetPages: Array<WidgetPage>) => {
      this.widgetPages = [];
      this.legacyWidgetPages = [];
      this.buildWidgetPageList(widgetPages);
    });
  }

  /**
   * Build the widget page list with given pages.
   */
  private buildWidgetPageList(widgetPages: Array<WidgetPage>) {
    // Separate legacy and current widgets
    for (const widgetPage of widgetPages) {

      if (widgetPage.version >= environment.widgetApi.currentVersion) {
        this.widgetPages.push(widgetPage);
      } else {
        this.legacyWidgetPages.push(widgetPage);
      }
    }
  }

  /**
   * Init the topbar
   */
  private initTopbar() {
    // Add a back button
    this.topbarService.setBackButton(new BackButton(
      BackButton.TYPE_LINK,
      'TOPBAR_BACK_BUTTON_LABEL_PROJECTAANVRAGEN',
      environment.projectaanvraagDashboardUrl
    ));
  }

}
