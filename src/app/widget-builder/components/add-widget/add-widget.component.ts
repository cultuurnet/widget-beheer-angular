import {Component, OnInit} from '@angular/core';
import {WidgetTypeRegistry} from '../../../shared/services/widget-type-registry.service';

@Component({
    selector: 'app-add-widget',
    templateUrl: './add-widget.component.html',
})
export class AddWidgetComponent implements OnInit {

    public widgetTypes = [];

    constructor(private widgetTypeRegistry: WidgetTypeRegistry) {}

    ngOnInit(): void {

        const keys = Object.keys(this.widgetTypeRegistry.widgetTypes);
        for (const key of keys) {
            this.widgetTypes.push({
                label: this.widgetTypeRegistry.widgetTypes[key].label,
                type: key
            });
        }

        console.log(this.widgetTypes);
    }
}
