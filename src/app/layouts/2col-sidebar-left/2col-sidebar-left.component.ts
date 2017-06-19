import {Component} from '@angular/core';
import {AbstractLayoutComponent} from '../../shared/components/abstract-layout.component';
import {WidgetTypeRegistry} from '../../shared/services/widget-type-registry.service';
import {WidgetBuilderService} from "../../widget-builder/services/widget-builder.service";

@Component({
    'selector': 'app-2-col-sidebar-left-layout',
    'templateUrl': './2col-sidebar-left.component.html'
})
export class TwoColSidebarLeftComponent extends AbstractLayoutComponent {

    /**
     * Construct the row preview.
     */
    constructor(protected widgetTypeRegistry: WidgetTypeRegistry, protected widgetBuilderService: WidgetBuilderService) {
        super(widgetTypeRegistry, widgetBuilderService);
    }

}
