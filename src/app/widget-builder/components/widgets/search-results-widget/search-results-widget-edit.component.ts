import { Component, Input } from "@angular/core";
import { AbstractWidgetEditComponent } from "../../../../core/widget/components/abstract-widget-edit-component";

@Component({
  templateUrl: './search-results-widget-edit.component.html'
})

export class SearchResultsWidgetEditComponent extends AbstractWidgetEditComponent {
  @Input() settings: any;
}