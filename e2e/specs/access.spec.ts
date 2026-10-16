import { test, expect } from '../support/test';
import { DASHBOARD_URL } from '../fixtures/data';

test('redirects to the dashboard when the user is not logged in', async ({
  page,
  api,
}) => {
  api.user = null;

  await page.goto('/project/project-1');

  await expect(page).toHaveURL(DASHBOARD_URL);
});

test('shows a no-access page when the user has no access to the project', async ({
  page,
  api,
}) => {
  api.projectStatus = 403;

  await page.goto('/project/project-1');

  await expect(page).toHaveURL('/project-no-access');
  await expect(
    page.getByText('U heeft geen toegang tot dit project.')
  ).toBeVisible();
});
