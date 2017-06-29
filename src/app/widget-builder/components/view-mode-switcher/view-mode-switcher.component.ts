import { Component, EventEmitter, OnInit, Output } from "@angular/core";

/**
 * The view mode switcher component allows for toggling
 * of different view modes (eg. desktop, tablet, mobile,...)
 */
@Component({
  selector: 'app-view-mode-switcher',
  templateUrl: './view-mode-switcher.component.html',
})
export class ViewModeSwitcherComponent implements OnInit {

  /**
   * Available view modes.
   * @type any
   */
  public viewModes: any = [
    {
      type: 'desktop',
      label: 'Desktop',
    },
    {
      type: 'tablet',
      label: 'Tablet',
    },
    {
      type: 'mobile',
      label: 'Mobile',
    }
  ];

  /**
   * Active view mode, defaults to "desktop".
   * @type {string}
   */
  public activeViewMode: string = 'desktop';

  /**
   * View mode changed event emitter.
   * @type {EventEmitter}
   */
  @Output() viewModeChanged: EventEmitter<string> = new EventEmitter();

  /**
   * @inheritDoc
   */
  ngOnInit() {
    // Emit default view mode
    this.viewModeChanged.emit(this.activeViewMode);
  }

  /**
   * Toggle the active view mode.
   * @param device
   */
  public toggleViewMode(device: string) {
    this.activeViewMode = device;

    // Emit event
    this.viewModeChanged.emit(this.activeViewMode);
  }

}
