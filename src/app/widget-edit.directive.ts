import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[widget-edit]',
})
export class WidgetEditDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
