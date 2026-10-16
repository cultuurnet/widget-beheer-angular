import { Locator, Page } from '@playwright/test';

/**
 * Interactions with the widget builder (page editor).
 *
 * Keep library-specific details (ng-bootstrap dropdowns, dragula, CKEditor)
 * in here, so specs keep working when those libraries are replaced.
 */
export class BuilderPage {
  constructor(private page: Page) {}

  async goto(projectId: string, pageId: string) {
    await this.page.goto(`/project/${projectId}/page/${pageId}/edit`);
  }

  async addRow(layoutLabel: string) {
    await this.page.getByRole('button', { name: 'Rij toevoegen' }).click();
    await this.page.getByText(layoutLabel).click();
  }

  /** The canvas block of a widget, identified by its id (see FakeApi render). */
  widget(widgetId: string): Locator {
    return this.page
      .locator('.component')
      .filter({ hasText: `Rendered widget ${widgetId}` });
  }

  /** Clicking the block hits an overlay link, which selects the widget. */
  async selectWidget(widgetId: string) {
    await this.widget(widgetId).click();
  }

  async removeWidget(widgetId: string) {
    await this.selectWidget(widgetId);
    // No accessible name: LABEL_REMOVE_WIDGET is missing in nl.json.
    await this.widget(widgetId).locator('.bnt-cnw-action--remove').click();
  }

  confirmationModal(): Locator {
    return this.page.getByRole('dialog');
  }
}
