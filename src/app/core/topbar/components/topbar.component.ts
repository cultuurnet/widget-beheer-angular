import {
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter, OnDestroy, OnInit, StaticInjector, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../user/user';
import { UserService } from '../../user/services/user.service';
import { BackButton } from '../back-button';
import { TopbarService } from '../services/topbar.service';
import { Subscription } from 'rxjs';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';

/**
 * Topbar component.
 */
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit, OnDestroy {

  /**
   * The dynamic component container
   */
  @ViewChild(DynamicComponentDirective, { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  /**
   * The back button
   */
  public backButton: BackButton;

  /**
   * The currently logged in user
   */
  public user: User;

  /**
   * Array of subscriptions
   */
  private subscriptions: Array<Subscription> = [];

  /**
   * Keep track of all dynamic components
   */
  private dynamicComponents: any = {};

  /**
   * Keep track of all subscriptions for each dynamic component
   */
  private dynamicComponentSubscriptions: any = {};

  /**
   * TopbarComponent constructor
   * @param userService
   * @param router
   * @param translateService
   * @param toastyService
   * @param topbarService
   * @param resolver
   */
  constructor (
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService,
    private toastyService: ToastyService,
    private topbarService: TopbarService,
    private resolver: ComponentFactoryResolver
  ) { }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    // Subscribe to the back button
    const backButtonSubscription = this.topbarService.backButton$.subscribe(
      backButton => {
        this.backButton = backButton;
      });

    this.subscriptions.push(backButtonSubscription);

    // Subscribe to the back button
    const dynamicComponentSubscription = this.topbarService.dynamicComponents$.subscribe(
      res => {
        switch (res.action) {
          case 'add':
            this.addDynamicComponent(res.data.id, res.data.component, res.data.inputs, res.data.index);
            break;
          case 'clear':
            this.clearDynamicComponents();
            break;
          case 'remove':
            this.removeDynamicComponent(res.data.id);
            break;
          case 'show':
            this.showDynamicComponents(res.data.ids);
            break;
          case 'hide':
            this.hideDynamicComponents(res.data.ids);
            break;
        }
      });

    this.subscriptions.push(dynamicComponentSubscription);

    // Get the user object
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy() {
    // Unsubscribe from all subscriptions
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * Logout the current user
   */
  public logout() {
    this.userService.logout().subscribe(() => {
      window.location.href = environment.projectaanvraagDashboardUrl;
    }, () => {
      // Failed logging out
      this.toastyService.error(this.translateService.instant('LOGOUT_FAILED_NOTIFICATION'));
    });
  }

  /**
   * Respond to the back button click
   */
  public back() {
    if (this.backButton.type === BackButton.TYPE_LINK) {
      return window.location.href = this.backButton.url;
    } else {
      return this.router.navigate(this.backButton.route);
    }
  }

  /**
   * Redirect the user to zendesk.
   */
  public goToZendesk() {
      window.open(environment.zendeskUrl, '_blank');
  }

  /**
   * Clear all dynamic components
   */
  private clearDynamicComponents() {
    if (!this.dynamicComponentContainer) {
      return;
    }

    // Unsubscribe from all subscriptions
    for (const id in this.dynamicComponentSubscriptions) {
      if (this.dynamicComponentSubscriptions.hasOwnProperty(id)) {
        for (const output in this.dynamicComponentSubscriptions[id]) {
          if (this.dynamicComponentSubscriptions[id].hasOwnProperty(output)) {
            this.dynamicComponentSubscriptions[id][output].unsubscribe();
          }
        }
      }
    }

    // Clear the subscriptions
    this.dynamicComponentSubscriptions = {};

    // Destroy all components
    this.dynamicComponentContainer.clear();
    this.dynamicComponents = {};
  }

  /**
   * Remove a dynamic component from the container
   * @param id
   */
  private removeDynamicComponent(id: string) {
    // Unsubscribe from all subscriptions for the given component id
    if (this.dynamicComponentSubscriptions.hasOwnProperty(id)) {
      for (const output in this.dynamicComponentSubscriptions[id]) {
        if (this.dynamicComponentSubscriptions[id].hasOwnProperty(output)) {
          this.dynamicComponentSubscriptions[id][output].unsubscribe();
        }
      }
    }

    // Remove the subscriptions
    this.dynamicComponentSubscriptions = _.omit(this.dynamicComponentSubscriptions, [id]);

    // Remove the component
    if (this.dynamicComponents.hasOwnProperty(id)) {
      this.dynamicComponents[id].destroy();
    }

    this.dynamicComponents = _.omit(this.dynamicComponents, [id]);
  }

  /**
   * Add a dynamic component to the host view
   * @param id
   * @param component
   * @param inputs
   * @param index
   */
  private addDynamicComponent(id: string, component: any, inputs: any = {}, index: number = null) {
    // Create factory out of the component we want to create
    const componentFactory = this.resolver.resolveComponentFactory(component);

    // Insert the component into the dom container
    const dynamicComponent = this.dynamicComponentContainer.createComponent(componentFactory, index);

    // Get all event emitters and subscribe to them, so we can have the events bubble of through the topbar service
    const componentInstance = dynamicComponent.instance;
    for (const key in componentInstance) {
      if (componentInstance.hasOwnProperty(key)) {
        // Subscribe to all event emitters
        if (componentInstance[key] instanceof EventEmitter) {
          const subscription = componentInstance[key].subscribe((value) => {
            this.topbarService.dispatchEvent({
              id: id,
              output: key,
              value: value
            });
          });

          _.set(this.dynamicComponentSubscriptions, [id, key], subscription);
        }
      }
    }

    // Set the input properties on the component instance
    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        componentInstance[key] = inputs[key];
      }
    }

    // Keep track of the component
    this.dynamicComponents[id] = dynamicComponent;
  }

  /**
   * Show dynamic components
   * @param ids
   */
  private showDynamicComponents(ids: Array<string>) {
    for (const id of ids) {
      if (this.dynamicComponents.hasOwnProperty(id)) {
        const component = this.dynamicComponents[id];
        const index = this.dynamicComponentContainer.indexOf(component);

        if (index === -1) {
          this.dynamicComponentContainer.insert(component.hostView);
        }
      }
    }
  }

  /**
   * Hide dynamic components
   * @param ids
   */
  private hideDynamicComponents(ids: Array<string>) {
    for (const id of ids) {
      if (this.dynamicComponents.hasOwnProperty(id)) {
        const component = this.dynamicComponents[id];
        const index = this.dynamicComponentContainer.indexOf(component);

        if (index > -1) {
          this.dynamicComponentContainer.detach(index);
        }
      }
    }
  }

}
