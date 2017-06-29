import { Directive, OnInit, OnDestroy, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { Subscription } from "rxjs";

/**
 * Provides a "click outside" directive
 */
@Directive({
  selector: '[click-outside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {

  /**
   * Click mouse event
   */
  private globalClick:Subscription;

  /**
   * Output event emitter
   */
  @Output('clickOutside') clickOutside:EventEmitter<Object>;

  /**
   * Boolean indicating if the directive should listen to the global click
   */
  @Input('listen') listen: boolean;

  /**
   * ClickOutside constructor.
   * @param _elRef
   */
  constructor(private _elRef:ElementRef) {
    this.listen = false;
    this.clickOutside = new EventEmitter();
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.globalClick = Observable
      .fromEvent(document, 'click')
      .delay(1)
      .subscribe((event:MouseEvent) => {
        this.onGlobalClick(event);
      });
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.globalClick.unsubscribe();
  }

  /**
   * Respond to a global click mouse event.
   * @param event
   */
  private onGlobalClick(event:MouseEvent) {
    if (event instanceof MouseEvent && this.listen === true) {
      if(this.isDescendant(this._elRef.nativeElement, event.target) === true) {
        this.clickOutside.emit({
          target: (event.target || null),
          value: false
        });
      } else {
        this.clickOutside.emit({
          target: (event.target || null),
          value: true
        });
      }
    }
  }

  /**
   * Check if the node is a child
   * @param parent
   * @param child
   * @returns {boolean}
   */
  private isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }
}
