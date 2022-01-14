import { Directive, ViewContainerRef } from '@angular/core';

/**
 * The widget edit directive
 */
@Directive({
  selector: '[appWidgetEdit]',
})
export class WidgetEditDirective {
  /**
   * WidgetEditDirective constructor
   * @param viewContainerRef
   */
  constructor(public viewContainerRef: ViewContainerRef) {}
}
