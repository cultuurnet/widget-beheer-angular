/*export interface WidgetEditComponent {
    widget: any;
}*/

import { Component, Input }  from '@angular/core';

@Component({
    template: `        
        <div class='wizardContent'>
  <span *ngFor='let fieldset of widget_schema.fieldsets; let i=index'>
  <fieldset>
  <legend *ngIf='fieldset.title'>{{fieldset.title}}</legend>
  <sf-form-element *ngFor='let fieldId of fieldset.fields' [formProperty]='formProperty.getProperty(fieldId)' >
  </sf-form-element>
  </fieldset>
  </span>
        </div>
    `,
})

export class WidgetEditComponent {
    @Input() widget_schema: any;
}