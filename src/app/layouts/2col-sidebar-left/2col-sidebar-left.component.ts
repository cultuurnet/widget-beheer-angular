import {Component} from '@angular/core';
import {AbstractLayoutComponent} from '../../shared/components/abstract-layout.component';
import {WidgetTypeRegistry} from '../../shared/services/widget-type-registry.service';

@Component({
    'selector': 'app-2-col-sidebar-left-layout',
    'templateUrl': './2col-sidebar-left.component.html'
})
export class TwoColSidebarLeftComponent extends AbstractLayoutComponent {

    /**
     * Construct the row preview.
     *
     * @param dragulaService
     * @param _componentFactoryResolver
     * @param registry
     * @param widgetService
     */
    constructor(protected widgetTypeRegistry: WidgetTypeRegistry) {
        super(widgetTypeRegistry);
    }

}
