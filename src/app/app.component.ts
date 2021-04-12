import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { TopbarService } from './core/topbar/services/topbar.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  // Sets initial value to true to show loading spinner on first load
  loading = true

  /**
   * AppComponent constructor
   * @param {TranslateService} translate
   * @param router
   * @param topbarService
   */
  constructor(private translate: TranslateService, private router: Router, private topbarService: TopbarService) {
    // Set fallback language + current language to nl.
    translate.setDefaultLang('nl');
    translate.use('nl');
  }

  /**
   * @inheritDoc
   */
  public ngOnInit() {

    document.querySelector('head').innerHTML += '<link rel="stylesheet" href="' + environment.apiUrl + 'assets/css/cn_widget_styling.css' + '" type="text/css"/>';

    this.router.events.subscribe((event) => {
      this.interceptNavigation(event);
    });
  }

  /**
   * Intercept the navigation events and act if needed
   * @param event
   */
  private interceptNavigation(event) {

    // Show loading state when a navigation event is starting.
    if (event instanceof NavigationStart) {
      this.loading = true
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }

    // Clear all topbar dynamic components on navigation end, so the loaded component can add its own
    if (event instanceof NavigationEnd) {
      this.topbarService.clearComponents();
      this.loading = false
    }
  }

}
