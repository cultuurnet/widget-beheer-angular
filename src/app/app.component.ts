import {Component} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  /**
   * AppComponent constructor
   * @param {TranslateService} translate
   */
  constructor(translate: TranslateService) {
    // Set fallback language + current language to nl.
    translate.setDefaultLang('nl');
    translate.use('nl');
  }

}
