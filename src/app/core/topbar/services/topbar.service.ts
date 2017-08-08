import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { BackButton } from "../back-button";
import { Subject } from "rxjs";

/**
 * Service that allows communication between the Topbar component and other components
 */
@Injectable()
export class TopbarService {

  /**
   * Observable backButton source
   */
  private backButtonSource = new Subject<BackButton>();

  /**
   * Observable backButton stream
   * @type {Observable<BackButton>}
   */
  public backButton$ = this.backButtonSource.asObservable();

  /**
   * Sets the back button
   * @param backButton
   */
  public setBackButton(backButton?: BackButton) {
    this.backButtonSource.next(backButton);
  }

  /**
   * Removes the back button
   */
  public removeBackButton() {
    this.backButtonSource.next();
  }

}
