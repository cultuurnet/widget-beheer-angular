import { Component, Input } from "@angular/core";

/**
 * Widget group filter component.
 */
@Component({
  selector: 'app-widget-group-filter',
  templateUrl: './group-filter.component.html'
})
export class WidgetGroupFilterComponent {

  @Input() settings: any;

}
