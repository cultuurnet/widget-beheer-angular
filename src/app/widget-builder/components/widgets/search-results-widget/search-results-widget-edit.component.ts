import { Component } from "@angular/core";
import { AbstractWidgetEditComponent } from "../../../../core/widget/components/abstract-widget-edit-component";
import { FormBuilder } from "@angular/forms";

/**
 * Search results widget edit form component.
 */
@Component({
  templateUrl: './search-results-widget-edit.component.html'
})
export class SearchResultsWidgetEditComponent extends AbstractWidgetEditComponent {

  /**
   * SearchResultsWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }

}