import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { TopbarService } from './core/topbar/services/topbar.service';
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

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
    // Clear all topbar dynamic components on navigation end, so the loaded component can add its own
    if (event instanceof NavigationEnd) {
      this.topbarService.clearComponents();
    }
  }

}
