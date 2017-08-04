import { Component, OnInit } from '@angular/core';
import { PageTemplateRegistry } from "../../../core/template/services/page-template-registry.service";
import { WidgetPageFactory } from "../../../core/widget/factories/widget-page.factory";
import { ActivatedRoute, Router } from "@angular/router";
import { WidgetService } from "../../../core/widget/services/widget.service";
import { TemplatePreviewModalComponent } from "./preview/template-preview-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Project } from "../../../core/project/project";

/**
 * Component used for adding a new widget page to a project.
 */
@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
})
export class AddPageComponent implements OnInit {

  /**
   * The current project
   */
  public project: Project;

  /**
   * Array containing all available page templates
   */
  public pageTemplates = [];

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
    this.route.data
      .subscribe((data: { project: Project }) => {
        this.project = data.project;
      });

    const keys = Object.keys(this.pageTemplateRegistry.pageTemplates);
    for (const key of keys) {
      this.pageTemplates.push({
        id: key,
        label: this.pageTemplateRegistry.pageTemplates[key].label,
        description: this.pageTemplateRegistry.pageTemplates[key].description,
        template: this.pageTemplateRegistry.pageTemplates[key]
      });
    }
  }

  /**
   * Add a widget page to the current project
   * @param pageTemplate
   */
  public addPage(pageTemplate: any) {
    // Merge the project id on the template configuration
    let config = pageTemplate.template.configuration;
    config['project_id'] = this.project.id;

    // Create a widget page from the template, ensuring it contains the required defaults, id's,...
    const widgetPage = this.widgetPageFactory.create(config);

    // Save the newly created widget page
    this.widgetService.saveWidgetPage(widgetPage).subscribe(widgetSaveResponse => {
      // Redirect to the widget builder
      this.router.navigate(['/project', this.project.id, 'page', widgetSaveResponse.widgetPage.id, 'edit']);
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
