import { Injectable, Type } from '@angular/core';
import { PageTemplate } from '../pageTemplate';

@Injectable()
export class PageTemplateRegistry {

  public pageTemplates = {};

  /**
   * Register a new page template.
   * @param id
   * @param pageTemplate
   */
  public register(id, pageTemplate: Type<PageTemplate>) {
    this.pageTemplates[id] = new pageTemplate();
  }

  /**
   * Get a single page template.
   * @param id
   */
  public get(id) {
    if (this.pageTemplates.hasOwnProperty(id)) {
      return this.pageTemplates[id];
    }
  }

}
