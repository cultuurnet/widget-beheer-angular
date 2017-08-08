import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastyService } from "ng2-toasty";
import { TranslateService } from "@ngx-translate/core";
import { User } from "../../user/user";
import { UserService } from "../../user/services/user.service";
import { BackButton } from "../back-button";
import { TopbarService } from "../services/topbar.service";
import { Subscription } from "rxjs";

/**
 * Topbar component.
 */
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit, OnDestroy {

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
   * TopbarComponent constructor
   * @param userService
   * @param router
   * @param translateService
   * @param toastyService
   * @param topbarService
   */
  constructor (
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService,
    private toastyService: ToastyService,
    private topbarService: TopbarService
  ) { }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    // Subscribe to the back button
    let backButtonSubscription = this.topbarService.backButton$.subscribe(
      backButton => {
        this.backButton = backButton;
      });

    this.subscriptions.push(backButtonSubscription);

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
      this.router.navigate(['/']);
    }, () => {
      // Failed logging out
      this.toastyService.error(this.translateService.instant('LOGOUT_FAILED_NOTIFICATION'));
    });
  }

  /**
   * Respond to the back button click
   */
  public back() {
    if (this.backButton.type == BackButton.TYPE_LINK) {
      return window.location.href = this.backButton.url;
    }else {
      return this.router.navigate(this.backButton.route);
    }
  }

}
