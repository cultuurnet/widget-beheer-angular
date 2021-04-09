import { Component, OnInit } from '@angular/core';
import { WidgetPage } from "../../../core/widget/widget-page";
import { WidgetService } from "../../../core/widget/services/widget.service";
import { Project } from "../../../core/project/project";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

/**
 * The RevertWidgetPageComponent reverts a given widget page to its published state
 * and redirects the user back to the widget builder.
 */
@Component({
  selector: 'app-revert-widget-page',
  template: './revert-widget-page.component.html'
})
export class RevertWidgetPageComponent implements OnInit {

  /**
   * The widgetpage to revert
   */
  public widgetPage: WidgetPage;

  /**
   * The current project
   */
  private project: Project;

  /**
   * RevertWidgetPageComponent constructor.
   * @param widgetService
   * @param route
   * @param router
   */
  constructor(
    private widgetService: WidgetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private translateService: TranslateService
  ) { }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { project: Project, widgetPage: WidgetPage }) => {
        this.project = data.project;
        this.widgetPage = data.widgetPage;
      });

    this.revertWidgetPage();
  }

  /**
   * Revert the loaded widget page to its published state and redirect to the builder
   */
  revertWidgetPage() {
    this.widgetService.revertWidgetPage(this.widgetPage).toPromise().then(async () => {
      await this.router.navigate(['/project', this.project.id, 'page', this.widgetPage.id, 'edit']);
      this.toastyService.success(this.translateService.instant('REVERT_WIDGET_PAGE_SUCCESS_NOTIFICATION'));
    }, async () => {
      await this.router.navigate(['/project', this.project.id, 'page', this.widgetPage.id, 'edit']);
      this.toastyService.error(this.translateService.instant('REVERT_WIDGET_PAGE_FAILED_NOTIFICATION'));
    });
  }

}
