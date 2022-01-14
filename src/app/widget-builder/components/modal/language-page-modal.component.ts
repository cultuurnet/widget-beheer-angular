import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetPage } from '../../../core/widget/widget-page';
import { WidgetService } from '../../../core/widget/services/widget.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Language {
  value: string;
  translationKey: string;
}

/**
 * Confirmation modal component.
 */
@Component({
  selector: 'app-language-page-modal',
  templateUrl: './language-page-modal.component.html',
})
export class LanguagePageModalComponent implements OnInit {
  /**
   * The language edit form
   */
  public languageForm: FormGroup;

  /**
   * Indicates if the widget is being saved
   * @type {boolean}
   */
  public isSaving = false;

  /**
   * Indicates if the widget is being publishid
   * @type {boolean}
   */
  public publishing = false;

  /**
   * The widgetpage that was modified
   */
  public widgetPage: WidgetPage;

  public language;

  public languages: Language[] = [
    {
      value: 'nl',
      translationKey: 'WIDGET_PAGE_LANGUAGE_MODAL_NL',
    },
    {
      value: 'fr',
      translationKey: 'WIDGET_PAGE_LANGUAGE_MODAL_FR',
    },
    {
      value: 'en',
      translationKey: 'WIDGET_PAGE_LANGUAGE_MODAL_EN',
    },
    {
      value: 'de',
      translationKey: 'WIDGET_PAGE_LANGUAGE_MODAL_DE',
    },
  ];

  /**
   * AdminPageModalComponent constructor.
   * @param activeModal
   * @param formBuilder
   * @param widgetService
   */
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private widgetService: WidgetService
  ) {}

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this.languageForm = this.formBuilder.group({
      language: this.widgetPage.language,
    });
  }

  public save() {
    this.isSaving = true;
    this.publishing = true;

    // Apply the language to the widgetpage model
    this.widgetPage.language = this.languageForm.controls.language.value;

    // Save the widget page (will trigger a render for the current widget)
    this.widgetService.saveWidgetPage(this.widgetPage).subscribe(
      () => {
        this.isSaving = false;
        this.widgetService.publishWidgetPage(this.widgetPage).subscribe(
          () => {
            this.activeModal.close(true);
            this.publishing = false;
          },
          () => {
            this.publishing = false;
          }
        );
      },
      () => {
        this.isSaving = false;
      }
    );
  }
}
