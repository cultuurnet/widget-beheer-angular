import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Widget } from '../../../core/widget/widget';
import { WidgetBuilderService } from '../../services/widget-builder.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonEditModalComponent } from './json-edit-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastyService } from 'ng2-toasty';

/**
 * The json edit component allows direct editing of a widgets' JSON
 */
@Component({
  selector: 'app-json-edit',
  templateUrl: './json-edit.component.html'
})
export class JsonEditComponent implements OnInit {

  /**
   * The widget being edited
   */
  @Input() widget: Widget;

  /**
   * Notify any changes in the widget JSON
   * @type {EventEmitter<any>}
   */
  @Output() jsonChanged = new EventEmitter<any>();

  /**
   * The formatted JSON
   */
  public json: string;

  /**
   * JsonEditComponent constructor
   */
  constructor(
    private widgetBuilderService: WidgetBuilderService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private toastyService: ToastyService
  ) { }

  /**
   * Open the JSON edit modal to start editing
   */
  public editJson() {
    // Show the confirmation modal (disable keyboard and background dismiss)
    const modal = this.modalService.open(JsonEditModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });

    const modalInstance = modal.componentInstance;
    modalInstance.widget = this.widget;

    modal.result.then((result) => {
      if (result) {
        // Update the widget JSON
        this.json = JSON.stringify(this.widget.settings, undefined, 4);

        // Notify the parent of the JSON change
        this.jsonChanged.emit();
        this.toastyService.success(this.translateService.instant('WIDGET_JSON_EDIT_SUCCESS_NOTIFICATION'));

        // Render the widget
        this.widgetBuilderService.renderWidget(this.widget.id);
      }
    }, () => {});
  }
  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this.json = JSON.stringify(this.widget.settings, undefined, 4);
  }

}
