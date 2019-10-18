import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetPage } from '../../../core/widget/widget-page';
import { WidgetService } from '../../../core/widget/services/widget.service';
import { WidgetBuilderService } from '../../services/widget-builder.service';
import { HttpClient } from '@angular/common/http';

/**
 * ThemeEditModalComponent modal component.
 */
@Component({
  selector: 'app-theme-edit-modal',
  templateUrl: './theme-edit-modal.component.html'
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
  ) { }



  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this.themeOptions =  [
      {
        name: 'Bram\'s paradise',
        description: 'a blend of peaceful pastel colours',
        preview: 'paradise_circus.jpg',
        stylesheet: 'paradise-circus.css'
      },
      {
        name: 'BILL',
        description: 'stijl je agenda zoals de BILL jongerenagenda',
        preview: 'bill.png',
        stylesheet: 'paradise-circus.css'
      },
      {
        name: 'Indian Summer',
        description: 'cool',
        preview: 'indian_summer.png',
        stylesheet: 'paradise-circus.css'
      },
      {
        name: 'Smooth operator',
        description: 'Corneel wille\'s smooth theme',
        preview: 'smooth-operator.jpg',
        stylesheet: 'smooth-operator.css'
      }
    ]
    if (this.widgetPage.selectedTheme) {
      this.selectedTheme = this.widgetPage.selectedTheme;
    }
  }

  public selectTheme(theme) {
    this.selectedTheme = theme;
  }

  public isActiveTheme(theme) {
    if (!this.selectedTheme) {
      return;
    }
    if (this.selectedTheme.name === theme.name) {
      return true;
    }
  }

  public setCssFromTheme() {
    return this.http.get(`assets/themes/${this.selectedTheme.stylesheet}`, {responseType: 'text'})
    .subscribe(data => {
      this.widgetPage.css = data;
    })
  }

  /**
   * Save Theme
   */
  public save() {
    this.isSaving = true;
    this.error = false;
    this.setCssFromTheme();
    // Save the widget page (will trigger a render for the current widget)
    this.widgetService.saveWidgetPage(this.widgetPage).subscribe(() => {
      // Save the selectedTheme
      this.widgetPage.selectedTheme = this.selectedTheme;
      if (this.widgetBuilderService.attachCss(this.widgetPage.css)) {
        // Close the modal
        this.activeModal.close(true);
      } else {
        this.error = true;
        this.isSaving = false;
      }
    }, () => {
      this.isSaving = false;

      // Show error message in the modal
      this.error = true;
    });
  }

}
