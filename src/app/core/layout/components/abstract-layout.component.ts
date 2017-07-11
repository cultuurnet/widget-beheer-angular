import { Input } from "@angular/core";

/**
 * Provides a base component for layouts.
 */
export abstract class AbstractLayoutComponent {

  /**
   * The Layout regions
   */
  @Input() regions: any;

}