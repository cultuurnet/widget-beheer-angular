import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import {WidgetEditComponent} from "./widget-edit.component";
import {WidgetEditDirective} from "./widget-edit.directive";
import { Config } from './config';
import {WidgetRegistry} from "angular2-schema-form";
import {WidgetService} from "./widget.service";
import {Widget} from "./widget";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(WidgetEditDirective) searchForm: WidgetEditDirective;

  private widgets;
  public activeWidget;
  public schema: any;
  public model: any;

  constructor(private dragulaService: DragulaService, private _componentFactoryResolver: ComponentFactoryResolver, registry: WidgetRegistry, private widgetService: WidgetService) {
    dragulaService.setOptions('widget-container', {
      moves: function (el, container, handle) {
        return handle.className === 'handle';
      }
    });
  }

  ngOnInit() {
    this.widgets = this.widgetService.getWidgets();
  }

  public editing;
  public editForm;

  /**
   * Start editing the given widget.
   * @param widget
   */
  public editWidget(widget:Widget) {

    this.editing = true;
    this.schema = Config['SCHEMA_' + widget.type.toUpperCase()];
    this.activeWidget = widget;
    //this.model = widget.settings;

/*    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(WidgetEditComponent);

    let viewContainerRef = this.searchForm.viewContainerRef;
    console.log(this.searchForm);
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<WidgetEditComponent>componentRef.instance).widget_schema = Config.SCHEMA;*/
  }

}
