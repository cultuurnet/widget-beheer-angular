import { Component, Input } from "@angular/core";
import { WidgetEditComponent } from "../../../widget-builder/widget-edit.component";

@Component({
  templateUrl: './search-form-widget-edit.component.html'
})

export class SearchFormWidgetEditComponent implements WidgetEditComponent {

  @Input() settings: any;

}
