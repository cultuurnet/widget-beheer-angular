import { Directive, ViewContainerRef } from '@angular/core';

/**
 * The row layout directive
 */
@Directive({
  selector: '[appRowLayout]',
})
export class RowLayoutDirective {

  /**
   * RowLayoutDirective constructor
   * @param viewContainerRef
   */
  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
