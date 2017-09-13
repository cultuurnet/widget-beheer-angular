import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Search form widget preview component.
 */
@Component({
  templateUrl: './search-form-widget-preview.component.html'
})
export class SearchFormWidgetPreviewComponent implements OnInit {

  @Output() findMe: EventEmitter<Object> = new EventEmitter();
  @Output() test: EventEmitter<Object> = new EventEmitter();

  constructor() {
    this.findMe.emit({test: 'constructor'});
  }

  public ngOnInit() {
    this.findMe.emit({test: 'var'});
  }

}
