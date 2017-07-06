import { Input } from "@angular/core";

/**
 *
 */
export abstract class AbstractLayoutComponent {

  /**
   * The Layout regions
   */
  @Input() regions: any;

}