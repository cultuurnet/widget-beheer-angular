import { Component, Input } from "@angular/core";
import { WidgetEditComponent } from "../../../widget-builder/widget-edit.component";

@Component({
  templateUrl: './search-results-widget-edit.component.html'
})

export class SearchResultsWidgetEditComponent implements WidgetEditComponent {
  @Input() settings: any;
}