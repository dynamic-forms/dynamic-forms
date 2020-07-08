import { ExamplesPage } from './examples.po';

describe('dynamic-forms-demo examples', () => {
  const themes = [ 'bootstrap', 'material' ];

  themes.forEach((theme) => {
    describe(`for theme ${theme}`, () => {
      let page: ExamplesPage;

      beforeEach(() => {
        page = new ExamplesPage(theme);
      });

      it('has url and title', () => {
        page.navigateTo();

        expect(page.getUrl()).toContain(`/examples/${theme}`);
        expect(page.getTitle()).toEqual('dynamic-forms');
      });
    });
  });
});
