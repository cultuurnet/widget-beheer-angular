import { Injectable, Type } from '@angular/core';
import { Layout } from '../layout';
import { AbstractLayoutDirective } from '../components/abstract-layout.component';

@Injectable()
export class LayoutTypeRegistry {
  public layoutTypes = {};

  /**
   * Register a new layout type.
   * @param id
   * @param label
   * @param layoutType
   * @param layoutComponent
   */
  public register(
    id,
    label,
    layoutType: Type<Layout>,
    layoutComponent: Type<AbstractLayoutDirective>
  ) {
    this.layoutTypes[id] = {
      label: label,
      layout: layoutType,
      component: layoutComponent,
    };
  }

  /**
   * Get the layout type.
   * @param type
   */
  public getLayoutType(type: string) {
    if (this.layoutTypes.hasOwnProperty(type)) {
      return this.layoutTypes[type];
    }
  }

  /**
   * Get an instance of given layout type.
   * @param type
   * @returns {Layout}
   */
  public getInstance(type: string) {
    if (this.layoutTypes.hasOwnProperty(type)) {
      return new this.layoutTypes[type].layout(type);
    }
  }
}
