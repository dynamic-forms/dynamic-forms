import { AppPage } from './app.po';

describe('dynamic-forms demo app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('has url and title', async () => {
    await page.navigateTo();

    expect(await page.getUrl()).toContain('/home');
    expect(await page.getTitle()).toEqual('dynamic-forms');
  });
});
