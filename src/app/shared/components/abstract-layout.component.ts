import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {WidgetTypeRegistry} from '../services/widget-type-registry.service';
import {Widget} from '../widget';
import {WidgetBuilderService} from "../../widget-builder/services/widget-builder.service";

export abstract class AbstractLayoutComponent implements OnInit {

    @Input() regions: any;

    @Output() updateSelectedWidget = new EventEmitter<Widget>();

    public widgetTypes = [];

    public selectedWidget;

    /**
     * Construct the row preview.
     *
     * @param dragulaService
     * @param _componentFactoryResolver
     * @param registry
     * @param widgetService
     */
    constructor(protected widgetTypeRegistry: WidgetTypeRegistry, protected widgetBuilderService: WidgetBuilderService) {
        widgetBuilderService.widgetSelected$.subscribe(
            widget => {
                this.selectedWidget = widget
            });

    }

    ngOnInit(): void {

        const keys = Object.keys(this.widgetTypeRegistry.widgetTypes);
        for (const key of keys) {
            this.widgetTypes.push({
                label: this.widgetTypeRegistry.widgetTypes[key].label,
                type: key
            });
        }

    }

    /**
     * Start editing the given widget.
     * @param widget
     */
    public editWidget(widget: Widget) {
        this.selectedWidget = widget;
        this.widgetBuilderService.selectWidget(widget);
    }

}