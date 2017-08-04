import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

/**
 * Template preview modal component.
 */
@Component({
  selector: 'app-template-preview-modal',
  templateUrl: './template-preview-modal.component.html'
})
export class TemplatePreviewModalComponent {

  /**
   * The template id
   */
  public templateId: string;

  /**
   * The modal title
   */
  public title: string;

  /**
   * TemplatePreviewModalComponent constructor.
   * @param activeModal
   */
  constructor(public activeModal: NgbActiveModal) {
  }

}
