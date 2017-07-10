import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[widget-preview]',
})
export class WidgetPreviewDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
