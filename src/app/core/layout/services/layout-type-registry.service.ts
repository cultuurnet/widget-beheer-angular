import { Injectable, Type } from '@angular/core';
import { Layout } from "../layout";
import { AbstractLayoutComponent } from "../components/abstract-layout.component";

@Injectable()
export class LayoutTypeRegistry {

  public layoutTypes = {};

  /**
   * Register a new layout type.
   * @param id
   * @param layoutType
   * @param layoutComponent
   */
  public register(id, layoutType: Type<Layout>, layoutComponent: Type<AbstractLayoutComponent>) {
    this.layoutTypes[id] = {
      layout: layoutType,
      component: layoutComponent
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
