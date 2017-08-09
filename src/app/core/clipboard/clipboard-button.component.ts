import { Component, Input, OnInit } from "@angular/core";

/**
 * Copy to clipboard button component.
 */
@Component({
  selector: 'app-clipboard-button',
  templateUrl: './clipboard-button.component.html',
})
export class ClipboardButtonComponent {

  /**
   * The content to copy to the clipboard
   */
  @Input() content: string;

  /**
   * Flag indicating if the text was copied successfully
   */
  public copySuccess: boolean = false;

  /**
   * React on clipboard copy success
   * @param $event
   */
  public cbCopySuccess($event) {
    let _self = this;
    this.copySuccess = true;

    setTimeout(function() {
      _self.copySuccess = false;
    }, 1500);
  }

}