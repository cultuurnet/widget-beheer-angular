import { test, expect } from '../support/test';
import { BuilderPage } from '../support/builder-page';
import { buildRow, buildWidget, buildWidgetPage } from '../fixtures/data';

const pageWithHtmlWidget = () =>
  buildWidgetPage({
    id: 'page-1',
    rows: [
      buildRow('one-col', {
        content: [buildWidget({ id: 'widget-1', type: 'html' })],
      }),
    ],
  });

test('adding a row saves it to the widget page', async ({ page, api }) => {
  api.widgetPages = [buildWidgetPage({ id: 'page-1' })];
  const builder = new BuilderPage(page);

  await builder.goto('project-1', 'page-1');
  await builder.addRow('Volledige paginabreedte');

  await expect.poll(() => api.savedPages().length).toBe(1);
  expect(api.lastSavedPage()?.rows).toEqual([
    { type: 'one-col', regions: { content: { widgets: [] } } },
  ]);
});

test('renders a preview for each widget on the page', async ({ page, api }) => {
  api.widgetPages = [pageWithHtmlWidget()];
  const builder = new BuilderPage(page);

  await builder.goto('project-1', 'page-1');

  await expect(builder.widget('widget-1')).toBeVisible();
});

test('removing a widget asks for confirmation and saves the page without it', async ({
  page,
  api,
}) => {
  api.widgetPages = [pageWithHtmlWidget()];
  const builder = new BuilderPage(page);

  await builder.goto('project-1', 'page-1');
  await builder.removeWidget('widget-1');

  const modal = builder.confirmationModal();
  await expect(modal.getByText('Widget verwijderen')).toBeVisible();
  await modal.getByRole('button', { name: 'Ja' }).click();

  await expect(builder.widget('widget-1')).toHaveCount(0);
  await expect.poll(() => api.savedPages().length).toBe(1);
  expect(api.lastSavedPage()?.rows[0].regions.content.widgets).toEqual([]);
});

test('cancelling the removal keeps the widget and does not save', async ({
  page,
  api,
}) => {
  api.widgetPages = [pageWithHtmlWidget()];
  const builder = new BuilderPage(page);

  await builder.goto('project-1', 'page-1');
  await builder.removeWidget('widget-1');
  await builder
    .confirmationModal()
    .getByRole('button', { name: 'Nee' })
    .click();

  await expect(builder.confirmationModal()).toHaveCount(0);
  await expect(builder.widget('widget-1')).toBeVisible();
  expect(api.savedPages()).toEqual([]);
});
