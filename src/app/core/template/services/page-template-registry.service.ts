import { Injectable } from '@angular/core';
import { PageTemplate } from '../pageTemplate';

/**
 * Page template registry service.
 * Used for registering available widget page templates in the application.
 */
@Injectable()
export class PageTemplateRegistry {
  /**
   * Collection of registered page templates.
   * @type any
   */
  public pageTemplates: any = {};

  /**
   * Register a new page template.
   * @param id
   * @param pageTemplate
   */
  public register(id, pageTemplate: PageTemplate) {
    this.pageTemplates[id] = pageTemplate;
  }

  /**
   * Get a single page template.
   * @param id
   */
  public get(id) {
    if (this.pageTemplates.hasOwnProperty(id)) {
      return this.pageTemplates[id];
    }

    return false;
  }
}
