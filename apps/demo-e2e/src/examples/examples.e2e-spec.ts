import { ExamplesMenu, ExamplesMenuItem } from 'apps/demo/src/app/layout/header/examples-menu/examples-menu';
import { by, element } from 'protractor';
import { Example, ExamplesPage } from './examples.po';

const examplesConfig = require('../../../demo/src/assets/examples-menu.json');

export function getExamples(items: ExamplesMenuItem[], namePrefix?: string): Example[] {
  return items.reduce((result, item) => {
    const name = namePrefix ? `${namePrefix} - ${item.label}` : item.label;
    return item.items && item.items.length
      ? result.concat(getExamples(item.items, name))
      : result.concat({ id: item.id, modelId: item.modelId, name });
  }, []);
}

describe('dynamic-forms-demo examples', () => {
  const themes = [ 'bootstrap', 'material' ];
  const examples = getExamples((examplesConfig as ExamplesMenu).items);

  themes.forEach(theme => {
    describe(`for theme ${theme}`, () => {
      let page;

      beforeEach(() => {
        page = new ExamplesPage(theme);
      });

      it('has url and title', () => {
        page.navigateTo();

        expect(page.getUrl()).toContain(`/examples/${theme}`);
        expect(page.getTitle()).toEqual('dynamic-forms');
      });

      examples.forEach(example => {
        const description = example.modelId
          ? `for example "${example.name}" with id "${example.id}" and model id "${ example.modelId }"`
          : `for example "${example.name}" with id "${example.id}"`;

        describe(description, () => {
          it('has url, title and form', () => {
            page.navigateToExample(example);

            const root = element(by.tagName('dynamic-form'));
            const wrapper = root.element(by.css('.dynamic-form-wrapper'));
            const form = wrapper.element(by.css('.dynamic-form'));
            const formElements = form.all(by.tagName('dynamic-form-element'));
            const formActions = form.element(by.css('.dynamic-form-actions'));
            const formControlElements = form.all(by.tagName('dynamic-form-control'));
            const formActionElements = formActions.all(by.tagName('dynamic-form-element'));

            expect(page.getUrl()).toContain(`/examples/${theme}/${example.id}`);
            expect(wrapper.getAttribute('class')).toContain(theme);
            expect(form.getTagName()).toBe('form');
            expect(formElements.count()).toBeGreaterThan(0);

            formControlElements.count().then(count => {
              if (count > 0) {
                expect(formActionElements.count()).toBeGreaterThan(0);
              } else {
                expect(formActionElements.count()).toBe(0);
              }
            });
          });
        });
      });
    });
  });
});
