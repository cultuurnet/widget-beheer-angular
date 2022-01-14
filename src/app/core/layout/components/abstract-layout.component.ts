import { Input, Directive } from '@angular/core';

/**
 * Provides a base component for layouts.
 */
@Directive()
export abstract class AbstractLayoutDirective {
  /**
   * The Layout regions
   */
  @Input() regions: any;
}
