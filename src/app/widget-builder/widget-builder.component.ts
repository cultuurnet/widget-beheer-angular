import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {WidgetEditDirective} from './directives/widget-edit.directive';
import {DragulaService} from 'ng2-dragula';
import {WidgetRegistry} from 'angular2-schema-form';
import {Widget} from '../shared/widget';
import {Config} from '../config';
import {WidgetEditComponent} from './widget-edit.component';
import {WidgetService} from '../widget.service';
import {WidgetTypeRegistry} from '../shared/services/widget-type-registry.service';

@Component({
  selector: 'app-widget-builder',
  templateUrl: './widget-builder.component.html',
})
export class WidgetBuilderComponent implements OnInit {
  @ViewChild(WidgetEditDirective) editForm: WidgetEditDirective;

  private widgets;
  public activeWidget;
  public editingPage;
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
  constructor(private dragulaService: DragulaService, private _componentFactoryResolver: ComponentFactoryResolver, private widgetService: WidgetService, private widgetTypeRegistry: WidgetTypeRegistry) {

    // Only allow dragging when using the move span.
    dragulaService.setOptions('widget-container', {
      moves: function (el, container, handle) {
        return handle.classList.contains('drag');
      }
    });
  }

  ngOnInit() {
    this.widgets = this.widgetService.getWidgets();
    this.editingPage = Config.EXAMPLE_PAGE;
  }

  /**
   * Start editing the given widget.
   * @param widget
   */
  public editWidget(widget:Widget) {

      // For POC: build instance here. For end product, instance is build when retrieving the page.
      let widgetInstance = this.widgetTypeRegistry.getInstance(widget);
console.log(widgetInstance);
console.log(widget);
    this.editing = true;
    this.activeWidget = widgetInstance;

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(widgetInstance.editComponent);
    let viewContainerRef = this.editForm.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<WidgetEditComponent>componentRef.instance).settings = widgetInstance.settings;
  }

  /**
   * Toggle the sidebar.
   */
  public toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

}
