import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as cssbeautify from 'cssbeautify';
import { WidgetPage } from "../../../../core/widget/widget-page";
import { WidgetService } from "../../../../core/widget/services/widget.service";
import { Styles } from "../../../../core/widget/styles";
import { WidgetBuilderService } from "../../../services/widget-builder.service";

/**
 * CssEditModalComponent modal component.
 */
@Component({
  selector: 'app-css-edit-modal',
  templateUrl: './css-edit-modal.component.html'
})
export class CssEditModalComponent implements OnInit {

  /**
   * The CSS edit form
   */
  public cssEditForm: FormGroup;

  /**
   * The CSS scrape form
   */
  public cssScrapeForm: FormGroup;

  /**
   * Indicates if the widget is being saved
   * @type {boolean}
   */
  public isSaving: boolean = false;

  /**
   * The widgetPage being edited
   */
  public widgetPage: WidgetPage;

  /**
   * Show/hide error message
   */
  public error: boolean = false;

  /**
   * The scraped styles
   */
  public scrapedStyles: Styles = {
    url: 'someurl.com',
    colors: ['#626262'],
    fonts: ["'Verdana', 'Arial', 'Helvetica'"]
  };

  /**
   * CssEditModalComponent constructor.
   * @param activeModal
   * @param formBuilder
   * @param widgetService
   * @param widgetBuilderService
   */
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private widgetService: WidgetService,
    private widgetBuilderService: WidgetBuilderService
  ) { }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    let css = '';

    // Format the css
    if (this.widgetPage.css) {
      css = cssbeautify(this.widgetPage.css, {
        autosemicolon: true
      });
    }

    // Css edit form
    this.cssEditForm = this.formBuilder.group({
      css: [css],
    });

    // Scrape form
    this.cssScrapeForm = this.formBuilder.group({
      url: ['', [Validators.pattern("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"), Validators.required]]
    });
  }

  /**
   * Scape a given URL for
   */
  public scrapeCss() {
    // Scrape a given URL for css styles
    this.scrapedStyles = {
      url: 'someurl.com',
      colors: ['#626262'],
      fonts: ["'Verdana', 'Arial', 'Helvetica'"]
    };
  }

  /**
   * Show the user the scrape URL form
   */
  public resetScrapedStyles() {
    // Reset the scraped styles
    this.scrapedStyles = null;
  }

  /**
   * Apply the CSS to the widget settings and save the widget page
   */
  public save() {
    this.isSaving = true;
    this.error = false;

    // Apply the css to the widgetpage model
    this.widgetPage.css = this.cssEditForm.get('css').value;

    // Save the widget page (will trigger a render for the current widget)
    this.widgetService.saveWidgetPage(this.widgetPage).subscribe(() => {
      // Apply the widgetPage css to the DOM
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
