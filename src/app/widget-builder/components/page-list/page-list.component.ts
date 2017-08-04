import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { WidgetPage } from "../../../core/widget/widget-page";
import * as _ from "lodash";
import { WidgetService } from "../../../core/widget/services/widget.service";
import { Project } from "../../../core/project/project";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "app/core/modal/components/confirmation-modal.component";
import { ToastyService } from "ng2-toasty";

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
   */
  constructor(
    private widgetService: WidgetService,
    private modalService: NgbModal,
    private toastyService: ToastyService,
    private route: ActivatedRoute, private router: Router)
  { }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { widgetPages: Array<WidgetPage>, project: Project }) => {
        const _self = this;

        // Filter the widget pages by version
        this.widgetPages = _.filter (data.widgetPages, function(widgetPage) {
          return widgetPage.version >= _self.currentWidgetVersion;
        });

        this.legacyWidgetPages = _.filter (data.widgetPages, function(widgetPage) {
          return widgetPage.version < _self.currentWidgetVersion;
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
        if (widgetPage.version < this.currentWidgetVersion) {
          widgetPages = this.legacyWidgetPages;
        }

        const index = widgetPages.indexOf(widgetPage);
        if (index > -1) {
          widgetPages.splice(index, 1);
        }
      }, (error) => {
        this.toastyService.error('It fucking failed');
      });
    }, (reason) => {
      // Do nothing on modal close
    });
  }

}
