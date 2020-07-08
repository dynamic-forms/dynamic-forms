import { AppPage } from './app.po';

describe('dynamic-forms-demo app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('has url and title', () => {
    page.navigateTo();

    expect(page.getUrl()).toContain('/home');
    expect(page.getTitle()).toEqual('dynamic-forms');
  });
});
