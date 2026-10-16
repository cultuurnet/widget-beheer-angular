import { test, expect } from '../support/test';
import { buildWidgetPage } from '../fixtures/data';

test('lists current and legacy widget pages of the project', async ({
  page,
  api,
}) => {
  api.project = { ...api.project, name: 'Cultuurcentrum' };
  api.widgetPages = [
    buildWidgetPage({ id: 'page-1', title: 'Agenda' }),
    buildWidgetPage({ id: 'page-2', title: 'Oude agenda', version: 2 }),
  ];

  await page.goto('/project/project-1');

  await expect(
    page.getByRole('heading', { name: 'Cultuurcentrum' })
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Agenda', exact: true })
  ).toBeVisible();

  const legacySection = page.locator('.page-list--legacy-widgets');
  await expect(
    legacySection.getByRole('heading', { name: 'Widgets aangemaakt vòòr 2018' })
  ).toBeVisible();
  await expect(
    legacySection.getByRole('heading', { name: 'Oude agenda' })
  ).toBeVisible();
});

test('shows an empty state when the project has no widget pages', async ({
  page,
}) => {
  await page.goto('/project/project-1');

  await expect(page.getByText('Geen widgets gevonden.')).toBeVisible();
});

test('opens the editor for a widget page', async ({ page, api }) => {
  api.widgetPages = [buildWidgetPage({ id: 'page-1', title: 'Agenda' })];

  await page.goto('/project/project-1');
  await page.getByRole('button', { name: 'Aanpassen' }).click();

  await expect(page).toHaveURL('/project/project-1/page/page-1/edit');
  await expect(
    page.getByRole('button', { name: 'Rij toevoegen' })
  ).toBeVisible();
});
