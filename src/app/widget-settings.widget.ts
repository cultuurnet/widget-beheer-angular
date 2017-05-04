import { ObjectLayoutWidget } from 'angular2-schema-form';
import { Component, OnInit } from '@angular/core';
import { Config } from './config';

@Component({
  selector: 'widget-settings-widget',
  template: `      
  <span *ngFor='let fieldset of schema.fieldsets; let i=index'>
  <fieldset>
  <legend *ngIf='fieldset.title'>{{fieldset.title}}</legend>
  <sf-form-element *ngFor='let fieldId of fieldset.fields' [formProperty]='formProperty.getProperty(fieldId)' >
  </sf-form-element>
  </fieldset>
  </span>
  `,
  styles: ['./wizard.widget.css']
})

export class WidgetSettingsWidget extends ObjectLayoutWidget {
}
