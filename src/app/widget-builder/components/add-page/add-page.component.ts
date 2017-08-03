import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageTemplateRegistry } from "../../../core/template/services/page-template-registry.service";
import { PageTemplate } from "../../../core/template/pageTemplate";
import { WidgetPageFactory } from "../../../core/widget/factories/widget-page.factory";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { WidgetService } from "../../../core/widget/services/widget.service";
import { TemplatePreviewModalComponent } from "./preview/template-preview-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

/**
 * Component used for adding a new widget page to a project.
 */
@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
})
export class AddPageComponent implements OnInit, OnDestroy {

  /**
   * The id of the current project
   */
  protected projectId: string;

  /**
   * Array containing all available page templates
   */
  public pageTemplates = [];

  /**
   * Subscription to the route parameters
   */
  private paramSubscription: Subscription;

  /**
   * AddPageComponent constructor.
   * @param pageTemplateRegistry
   * @param widgetPageFactory
   * @param widgetService
   * @param modalService
   * @param route
   * @param router
   */
  constructor (
    private pageTemplateRegistry: PageTemplateRegistry,
    private widgetPageFactory: WidgetPageFactory,
    private widgetService: WidgetService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    const keys = Object.keys(this.pageTemplateRegistry.pageTemplates);
    for (const key of keys) {
      this.pageTemplates.push({
        id: key,
        label: this.pageTemplateRegistry.pageTemplates[key].label,
        description: this.pageTemplateRegistry.pageTemplates[key].description,
        template: this.pageTemplateRegistry.pageTemplates[key]
      });
    }

    this.paramSubscription = this.route.paramMap.subscribe(
      params => this.projectId = params.get('project_id')
    );
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  /**
   * Add a widget page to the current project
   * @param pageTemplate
   */
  public addPage(pageTemplate: any) {
    // Merge the project id on the template configuration
    let config = pageTemplate.template.configuration;
    config['project_id'] = this.projectId;

    // Create a widget page from the template, ensuring it contains the required defaults, id's,...
    let widgetPage = this.widgetPageFactory.create(config);

    // Save the newly created widget page
    this.widgetService.saveWidgetPage(widgetPage).subscribe(widgetSaveResponse => {
      // Redirect to the widget builder
      this.router.navigate(['/project', this.projectId, 'page', widgetSaveResponse.widgetPage.id, 'edit']);
    });
  }

  /**
   * Show a preview of the selected page template
   * @param pageTemplate
   */
  public preview(pageTemplate: any) {
    // Show the confirmation modal
    let modal = this.modalService.open(TemplatePreviewModalComponent, {windowClass: 'modal-fullscreen'});
    let modalInstance = modal.componentInstance;

    modalInstance.templateId = pageTemplate.id;
    modalInstance.title = pageTemplate.label;

    modal.result.then(() => {
      // Add the page
      this.addPage(pageTemplate);
    }, () => {});
  }

}
