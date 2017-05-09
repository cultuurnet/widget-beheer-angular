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
    @Output() widgetSelected = new EventEmitter<Widget>();

    /**
     * Construct the row preview.
     *
     * @param dragulaService
     * @param _componentFactoryResolver
     * @param registry
     * @param widgetService
     */
    constructor(private _componentFactoryResolver: ComponentFactoryResolver) {

    }

    public updateSelectedWidget(widget) {
        this.widgetSelected.emit(widget);
    }

    ngOnInit() {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TwoColSidebarLeftComponent);
        let viewContainerRef = this.preview.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);

        (<TwoColSidebarLeftComponent>componentRef.instance).regions = this.row.regions;

        componentRef.instance.updateSelectedWidget.subscribe((data => this.updateSelectedWidget(data)));
    }

}
