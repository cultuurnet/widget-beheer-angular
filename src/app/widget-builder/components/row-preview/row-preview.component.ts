import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { RowLayoutDirective } from '../../directives/row-layout.directive';
import { AbstractLayoutComponent } from "../../../core/layout/components/abstract-layout.component";
import { LayoutTypeRegistry } from "../../../core/layout/services/layout-type-registry.service";

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
   * @param layoutTypeRegistry
   */
  constructor(private _componentFactoryResolver: ComponentFactoryResolver, private layoutTypeRegistry: LayoutTypeRegistry) {
  }

  ngOnInit() {
    let componentType = this.layoutTypeRegistry.getLayoutType(this.row.type);
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType.component);
    let viewContainerRef = this.preview.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AbstractLayoutComponent>componentRef.instance).regions = this.row.regions;
  }

}
