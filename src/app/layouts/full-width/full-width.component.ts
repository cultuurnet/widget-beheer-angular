import {Component} from '@angular/core';
import {AbstractLayoutComponent} from '../../shared/components/abstract-layout.component';
import {WidgetTypeRegistry} from "../../shared/services/widget-type-registry.service";

@Component({
    'selector': 'app-full-width-layout',
    'templateUrl': './full-width.component.html'
})
export class FullWidthRowLayoutComponent extends AbstractLayoutComponent {

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
