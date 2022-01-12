import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetPage } from '../../../core/widget/widget-page';
import { WidgetService } from '../../../core/widget/services/widget.service';
import { WidgetBuilderService } from '../../services/widget-builder.service';
import { HttpClient } from '@angular/common/http';
import { themes } from './themes';

/**
 * ThemeEditModalComponent modal component.
 */
@Component({
  selector: 'app-theme-edit-modal',
  templateUrl: './theme-edit-modal.component.html',
})
export class ThemeEditModalComponent implements OnInit {
  /**
   * The themeOptions
   */
  public themeOptions: Array<any>;

  /**
   * The themeOptions
   */
  public selectedTheme: any;

  /**
   * The themeOptions
   */
  public cssTheme: any;

  /**
   * Indicates if the widget is being saved
   * @type {boolean}
   */
  public isSaving = false;

  /**
   * The widgetPage being edited
   */
  public widgetPage: WidgetPage;

  /**
   * Show/hide error message
   */
  public error = false;

  /**
   * ThemeEditModalComponent constructor.
   * @param activeModal
   * @param widgetService
   * @param widgetBuilderService
   * @param http
   */
  constructor(
    public activeModal: NgbActiveModal,
    private widgetService: WidgetService,
    private widgetBuilderService: WidgetBuilderService,
    private http: HttpClient
  ) {}

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this.themeOptions = themes;

    if (this.widgetPage.selectedTheme) {
      this.selectedTheme = this.themeOptions.find(
        (item) => item.name === this.widgetPage.selectedTheme
      );
    }
  }

  /**
   * Add the selected theme to scope
   */
  public selectTheme(theme) {
    this.selectedTheme = theme;
  }

  /**
   * Checks if the theme is active
   */
  public isActiveTheme(theme) {
    if (!this.selectedTheme) {
      return;
    }
    if (this.selectedTheme.name === theme.name) {
      return true;
    }
  }

  /**
   * Get the CSS from the selected theme
   */
  public getCSSfromTheme() {
    return this.http.get(
      `assets/themes/${this.selectedTheme.stylesheet as string}`,
      { responseType: 'text' }
    );
  }

  /**
   * Save Theme
   */
  public save() {
    this.isSaving = true;
    this.error = false;
    this.getCSSfromTheme().subscribe((data) => {
      this.widgetPage.css = data;
      this.widgetPage.selectedTheme = this.selectedTheme.name;
      // Save the widget page (will trigger a render for the current widget)
      this.widgetService.saveWidgetPage(this.widgetPage).subscribe(
        () => {
          // Save the selectedTheme
          if (this.widgetBuilderService.attachCss(this.widgetPage.css)) {
            // Close the modal
            this.activeModal.close(true);
          } else {
            this.error = true;
            this.isSaving = false;
          }
        },
        () => {
          this.isSaving = false;

          // Show error message in the modal
          this.error = true;
        }
      );
    });
  }
}
