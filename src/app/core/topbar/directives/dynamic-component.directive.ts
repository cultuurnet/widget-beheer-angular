import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Dynamic component directive
 */
@Directive({
  selector: '[appDynamicComponent]',
})
export class DynamicComponentDirective {

  /**
   * DynamicComponentDirective constructor
   * @param viewContainerRef
   */
  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
