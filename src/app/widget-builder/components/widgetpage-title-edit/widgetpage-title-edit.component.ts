import { Component, Input, OnInit } from '@angular/core';
import { WidgetPage } from "../../../core/widget/widget-page";
import { WidgetService } from "../../../core/widget/services/widget.service";
import { ToastyService } from "ng2-toasty";
import { TranslateService } from "@ngx-translate/core";

/**
 * Component used for editing the page title of the active widget page
 */
@Component({
  selector: 'app-widgetpage-title-edit',
  templateUrl: './widgetpage-title-edit.component.html',
})
export class WidgetPageTitleEditComponent implements OnInit {

  /**
   * The widget page to edit
   */
  @Input() widgetPage: WidgetPage;

  /**
   * Edit mode or not
   */
  public editing: boolean = false;

  /**
   * The widget page title
   */
  public title: string;

  /**
   * WidgetPageTitleEditComponent constructor
   * @param widgetService
   * @param toastyService
   * @param translateService
   */
  constructor(private widgetService: WidgetService, private toastyService: ToastyService, private translateService: TranslateService) {
  }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this.title = this.widgetPage.title;
  }

  /**
   * Toggle edit mode
   */
  public toggleEditMode() {
    this.editing = !this.editing;
  }

  /**
   * Cancel editing of the title
   */
  public cancel() {
    this.title = this.widgetPage.title;
    this.toggleEditMode();
  }

  /**
   * Save the title
   */
  public save() {
    if (this.widgetPage.title !== this.title) {
      const oldTitle = this.widgetPage.title;
      this.widgetPage.title = this.title;

      // Save the page
      this.widgetService.saveWidgetPage(this.widgetPage).subscribe(() => {
      }, () => {
        // Revert to the old title
        this.widgetPage.title = oldTitle;
        //this.toastyService.error(this.translateService.instant('WIDGET_PAGE_TITLE_EDIT_FAILED_NOTIFICATION'));
      });
    }

    // Close the form
    this.toggleEditMode();
  }

}
