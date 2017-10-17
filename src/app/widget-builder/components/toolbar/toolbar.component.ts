import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { WidgetService } from '../../../core/widget/services/widget.service';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import { WidgetPage } from '../../../core/widget/widget-page';
import { WidgetBuilderService } from '../../services/widget-builder.service';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublishPageConfirmationModalComponent } from '../modal/publish-page-confirmation-modal.component';
import { CssEditModalComponent } from '../widgets/css-edit/css-edit-modal.component';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../../core/modal/components/confirmation-modal.component';

/**
 * The toolbar component contains actions and tools for editing a widget page:
 *
 * Page title edit: Edit the page title
 *
 * View mode switcher: The view mode switcher allows for toggling
 * of different view modes (eg. desktop, tablet, mobile,...)
 */
@Component({
  selector: 'app-widgetbuilder-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit, OnDestroy {

  /**
   * View mode changed event emitter.
   * @type {EventEmitter}
   */
  @Output() viewModeChanged: EventEmitter<string> = new EventEmitter();

  /**
   * Close sidebar event emitter.
   * @type {EventEmitter}
   */
  @Output() sidebarClose: EventEmitter<boolean> = new EventEmitter();

  /**
   * The widget page to edit
   */
  @Input() widgetPage: WidgetPage;

  /**
   * Available view modes.
   * @type any
   */
  public viewModes: any = [
    {
      type: 'desktop',
      label: 'Desktop',
    },
    {
      type: 'tablet',
      label: 'Tablet',
    },
    {
      type: 'mobile',
      label: 'Mobile',
    }
  ];

  /**
   * Active view mode, defaults to "desktop".
   * @type {string}
   */
  public activeViewMode = 'desktop';

  /**
   * Edit title mode or not
   */
  public editingTitle = false;

  /**
   * The widget page title
   */
  public title: string;

  /**
   * Flag indicating if the sidebar is open or not
   */
  public sidebar = false;

  /**
   * Reference to the sidebar subscription
   */
  private sidebarSubscription: Subscription;

  /**
   * WidgetPageTitleEditComponent constructor
   * @param widgetService
   * @param widgetBuilderService
   * @param toastyService
   * @param translateService
   * @param modalService
   * @param router
   * @param route
   */
  constructor(
    private widgetService: WidgetService,
    private widgetBuilderService: WidgetBuilderService,
    private toastyService: ToastyService,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    // Emit default view mode
    this.viewModeChanged.emit(this.activeViewMode);
    this.title = this.widgetPage.title;

    this.sidebarSubscription = this.widgetBuilderService.sidebarStatus$.subscribe(status => {
      this.sidebar = status;
    });
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.sidebarSubscription.unsubscribe();
  }

  /**
   * Toggle the active view mode.
   * @param $event
   * @param device
   */
  public toggleViewMode($event, device: string) {
    // Stop the builder from deselecting the active widget
    $event.stopWidgetDeselect = true;

    // set the current active view mode
    this.activeViewMode = device;

    // Emit event
    this.viewModeChanged.emit(this.activeViewMode);
  }

  /**
   * Toggle title edit mode
   */
  public toggleTitleEditMode() {
    this.editingTitle = !this.editingTitle;
  }

  /**
   * Cancel editing of the title
   */
  public cancelTitleEdit() {
    this.title = this.widgetPage.title;
    this.toggleTitleEditMode();
  }

  /**
   * Close the widgetbuilder sidebar
   */
  public closeSidebar() {
    // Emit sidebar close event
    this.sidebarClose.emit(true);
  }

  /**
   * Save the title
   */
  public saveTitle() {
    if (this.widgetPage.title !== this.title) {
      const oldTitle = this.widgetPage.title;
      this.widgetPage.title = this.title;

      // Save the page
      this.widgetService.saveWidgetPage(this.widgetPage).subscribe((widgetSaveResponse) => {
        // Draft state
        this.widgetPage.draft = widgetSaveResponse.widgetPage.draft;
      }, () => {
        // Revert to the old title
        this.widgetPage.title = oldTitle;
        this.toastyService.error(this.translateService.instant('WIDGET_PAGE_TITLE_EDIT_FAILED_NOTIFICATION'));
      });
    }

    // Close the form
    this.toggleTitleEditMode();
  }

  /**
   * Revert changes in the draft version back to the published version
   */
  public revertDraft() {
    // Show the confirmation modal
    const modal = this.modalService.open(ConfirmationModalComponent);
    const modalInstance = modal.componentInstance;

    modalInstance.title = 'REVERT_WIDGET_PAGE_MODAL_TITLE';
    modalInstance.message = 'REVERT_WIDGET_PAGE_MODAL_MESSAGE';
    modalInstance.confirmButtonText = 'REVERT_WIDGET_PAGE_MODAL_BUTTON_CONFIRM';

    // Remove row on confirmation
    modal.result.then(() => {
      this.router.navigate(['/project', this.widgetPage.project_id, 'page', this.widgetPage.id, 'revert']);
    }, () => {});
  }

  /**
   * Publish the currently active widget page
   */
  public publishPage() {
    this.widgetService.publishWidgetPage(this.widgetPage).subscribe(() => {
      // After publishing, the widgetpage is no longer in draft
      this.widgetPage.draft = false;

      // Show the confirmation modal
      const modal = this.modalService.open(PublishPageConfirmationModalComponent);
      const modalInstance = modal.componentInstance;
      modalInstance.widgetPage = this.widgetPage;
    }, () => {
      this.toastyService.error(this.translateService.instant('WIDGET_PAGE_PUBLISH_FAILED_NOTIFICATION'));
    });
  }

  /**
   * Edit the widget page CSS
   */
  public editCss() {
    const modal = this.modalService.open(CssEditModalComponent, {
      windowClass: 'modal-large',
      backdrop: 'static',
      keyboard: false
    });

    const modalInstance = modal.componentInstance;
    modalInstance.widgetPage = this.widgetPage;

    modal.result.then((result) => {
      if (result) {
        this.toastyService.success(this.translateService.instant('WIDGET_PAGE_CSS_EDIT_SUCCESS_NOTIFICATION'));
      }
    }, () => {});
  }

}
