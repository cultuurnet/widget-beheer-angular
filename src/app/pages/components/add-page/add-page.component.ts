import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageTemplateRegistry } from "../../../core/template/services/page-template-registry.service";
import { PageTemplate } from "../../../core/template/pageTemplate";
import { WidgetPageFactory } from "../../../core/widget/factories/widget-page.factory";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

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
   * @param route
   * @param router
   */
  constructor(private pageTemplateRegistry: PageTemplateRegistry, private widgetPageFactory: WidgetPageFactory, private route: ActivatedRoute, private router: Router) {
  }

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
  public addPage(pageTemplate: PageTemplate) {
    // Create a widget page from the template, ensuring it contains the required defaults, id's,...
    let widgetPage = this.widgetPageFactory.create(pageTemplate.configuration);

    // @todo: Trigger the widgetpage create call
    let widgetPageId = '3c6ae3ef-cc96-4e15-880b-a4a5b5289fef';

    // Redirect to the widget builder
    this.router.navigate(['/project', this.projectId, 'page', widgetPageId, 'edit']);
  }

}
