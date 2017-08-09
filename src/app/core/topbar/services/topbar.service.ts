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
   * Observable dynamic components source
   */
  private dynamicComponentsSource = new Subject<any>();

  /**
   * Observable dynamic components stream
   * @type {Observable<Object>}
   */
  public dynamicComponents$ = this.dynamicComponentsSource.asObservable();

  /**
   * Observable dynamic components events source
   */
  private dynamicComponentsEvents = new Subject<any>();

  /**
   * Observable dynamic components events stream
   * @type {Observable<Object>}
   */
  public dynamicComponentsEvents$ = this.dynamicComponentsEvents.asObservable();

  /**
   * Sets the back button
   * @param backButton
   */
  public setBackButton(backButton?: BackButton) {
    this.backButtonSource.next(backButton);
  }

  /**
   * Add a dynamic component to the topbar
   * @param id
   * @param component
   * @param inputs
   */
  public addComponent(id: string, component: any, inputs: any = {}) {
    this.dynamicComponentsSource.next({
      action: 'add',
      data: {
        id: id,
        component: component,
        inputs: inputs
      }
    });

    return this.dynamicComponentsEvents$.filter(event => event.id === id);
  }

  /**
   * Remove all dynamic components from the topbar
   */
  public clearComponents() {
    this.dynamicComponentsSource.next({
      action: 'clear',
    });
  }

  /**
   * Remove a single component from the topbar
   */
  public removeComponent(id: string) {
    this.dynamicComponentsSource.next({
      action: 'remove',
      data: {
        id: id
      }
    });
  }

  /**
   * Dispatch an event from a dynamic component
   */
  public dispatchEvent(event: {id: any, output: string, value: any }) {
    this.dynamicComponentsEvents.next(event);
  }

}
