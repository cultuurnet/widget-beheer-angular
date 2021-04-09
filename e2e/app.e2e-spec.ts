import { AngularPage } from './app.po';

describe('angular App', () => {
  let page: AngularPage;

  beforeEach(() => {
    page = new AngularPage();
  });

  it('should display message saying app works', async () => {
    await page.navigateTo();
    expect(await page.getParagraphText()).toEqual('app works!');
  });
});
