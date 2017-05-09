import { ObjectLayoutWidget } from 'angular2-schema-form';
import { Component, OnInit } from '@angular/core';
import { Config } from '../config';

@Component({
  selector: 'widget-settings-widget',
  templateUrl: './widget-settings.widget.html',
})

export class WidgetSettingsWidget extends ObjectLayoutWidget implements OnInit {

  ngOnInit() {
    console.log(this.formProperty.getProperty('general'));
  }

  getFields(fieldset) {
    return Object.keys(this.formProperty.getProperty(fieldset).properties);
  }

}
