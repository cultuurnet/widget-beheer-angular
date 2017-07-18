import { Component } from "@angular/core";
import { AbstractWidgetEditComponent } from "../../../../core/widget/components/abstract-widget-edit-component";
import { FormBuilder } from "@angular/forms";

/**
 * Html widget edit form component.
 */
@Component({
  templateUrl: './html-widget-edit.component.html'
})
export class HtmlWidgetWidgetEditComponent extends AbstractWidgetEditComponent {

  /**
   * HtmlWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }

}