import { EditorPage } from './editor.po';

describe('dynamic-forms demo editor', () => {
  const themes = ['bootstrap', 'material'];

  themes.forEach(theme => {
    describe(`for theme ${theme}`, () => {
      let page: EditorPage;

      beforeEach(() => {
        page = new EditorPage(theme);
      });

      it('has url and title', async () => {
        await page.navigateTo();

        expect(await page.getUrl()).toContain(`/editor/${theme}`);
        expect(await page.getTitle()).toEqual('dynamic-forms');
      });
    });
  });
});
