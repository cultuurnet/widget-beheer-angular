import { Input, OnInit } from "@angular/core";

/**
 * Abstract implementation of a widget edit component
 */
export abstract class AbstractWidgetEditComponent {

  /**
   * The widget edit component settings
   */
  @Input() settings: any;

}