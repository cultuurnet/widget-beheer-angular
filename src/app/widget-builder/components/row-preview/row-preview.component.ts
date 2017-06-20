import {
    AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output,
    ViewChild
} from '@angular/core';
import {RowLayoutDirective} from '../../directives/row-layout.directive';
import {TwoColSidebarLeftComponent} from '../../../layouts/2col-sidebar-left/2col-sidebar-left.component';
import {Widget} from '../../../shared/widget';

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
    constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit() {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TwoColSidebarLeftComponent);
        let viewContainerRef = this.preview.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);

        (<TwoColSidebarLeftComponent>componentRef.instance).regions = this.row.regions;
    }

}
