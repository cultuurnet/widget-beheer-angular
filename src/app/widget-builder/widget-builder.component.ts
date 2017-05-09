import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {WidgetEditDirective} from './widget-edit.directive';
import {DragulaService} from 'ng2-dragula';
import {WidgetRegistry} from 'angular2-schema-form';
import {WidgetService} from '../widget.service';
import {Widget} from '../shared/widget';
import {Config} from '../config';
import {WidgetEditComponent} from './widget-edit.component';

@Component({
  selector: 'app-widget-builder',
  templateUrl: './widget-builder.component.html',
})
export class WidgetBuilderComponent implements OnInit {
  @ViewChild(WidgetEditDirective) editForm: WidgetEditDirective;

  private widgets;
  public activeWidget;
  public schema: any;
  public model: any;
  public editing;
  public showSidebar = true;

  /**
   * Construct the widget builder.
   *
   * @param dragulaService
   * @param _componentFactoryResolver
   * @param registry
   * @param widgetService
   */
  constructor(private dragulaService: DragulaService, private _componentFactoryResolver: ComponentFactoryResolver, registry: WidgetRegistry, private widgetService: WidgetService) {

    // Only allow dragging when using the move span.
    dragulaService.setOptions('widget-container', {
      moves: function (el, container, handle) {
        return handle.classList.contains('drag');
      }
    });
  }

  ngOnInit() {
    this.widgets = this.widgetService.getWidgets();
  }

  /**
   * Start editing the given widget.
   * @param widget
   */
  public editWidget(widget:Widget) {

    this.editing = true;
    this.schema = Config.SCHEMA_SEARCH_FORM;
    this.activeWidget = widget;

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(widget.editComponent);

    let viewContainerRef = this.editForm.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<WidgetEditComponent>componentRef.instance).settings = widget.settings;
  }

  /**
   * Toggle the sidebar.
   */
  public toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

}
