import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { RowLayoutDirective } from '../../directives/row-layout.directive';
import { AbstractLayoutComponent } from "../../../core/layout/components/abstract-layout.component";

@Component({
  'selector': 'app-row-preview',
  'templateUrl': './row-preview.component.html'
})
export class RowPreviewComponent implements OnInit {

  @ViewChild(RowLayoutDirective) preview: RowLayoutDirective;
  @Input() row: any;

  /**
   * Construct the row preview.
   *
   * @param {ComponentFactoryResolver} _componentFactoryResolver
   */
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.row.component);
    let viewContainerRef = this.preview.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AbstractLayoutComponent>componentRef.instance).regions = this.row.regions;
  }

}
