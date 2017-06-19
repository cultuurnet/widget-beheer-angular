import {Component} from '@angular/core';
import {AbstractLayoutComponent} from '../../shared/components/abstract-layout.component';
import {WidgetTypeRegistry} from "../../shared/services/widget-type-registry.service";
import {WidgetBuilderService} from "../../widget-builder/services/widget-builder.service";

@Component({
    'selector': 'app-full-width-layout',
    'templateUrl': './full-width.component.html'
})
export class FullWidthRowLayoutComponent extends AbstractLayoutComponent {

    /**
     * Construct the row preview.
     */
    constructor(protected widgetTypeRegistry: WidgetTypeRegistry, protected widgetBuilderService: WidgetBuilderService) {
        super(widgetTypeRegistry, widgetBuilderService);
    }

}
