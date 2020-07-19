import { ExamplesMenu, ExamplesMenuItem } from 'apps/demo/src/app/layout/header/examples-menu/examples-menu';
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

describe('dynamic-forms demo examples', () => {
  const themes = [ 'bootstrap', 'material' ];
  const examples = getExamples((examplesConfig as ExamplesMenu).items);

  themes.forEach(theme => {
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

      examples.forEach(example => {
        const description = example.modelId
          ? `for example "${example.name}" with id "${example.id}" and model id "${ example.modelId }"`
          : `for example "${example.name}" with id "${example.id}"`;

        describe(description, () => {
          it('has url, title and form', () => {
            page.navigateToExample(example);

            expect(page.getUrl()).toContain(`/examples/${theme}/${example.id}`);

            expect(page.findRootElement().isPresent()).toBe(true);
            expect(page.findWrapperElement().isPresent()).toBe(true);
            expect(page.findFormElement().isPresent()).toBe(true);
            expect(page.findFormActionsElement().isPresent()).toBe(true);
            expect(page.findFormElements().count()).toBeGreaterThan(0);

            const controlElements = page.findFormControlElements();
            const actionElements = page.findFormActionElements();

            controlElements.each(controlElement => {
              const inputElement = page.findFormInputElement(controlElement);

              expect(controlElement.isPresent()).toBe(true);
              expect(inputElement.isPresent()).toBe(true);
            });

            controlElements.count().then(count => {
              if (count > 0) {
                const actionButtonElements = page.findFormActionButtonElements();
                const validateButtonElement = page.findFormValidateButtonElement();

                expect(actionElements.count()).toBeGreaterThan(0);
                expect(actionButtonElements.count()).toBeGreaterThan(0);

                validateButtonElement.isPresent().then(isPresent => {
                  if (isPresent) {
                    console.log('validate button present');
                    validateButtonElement.click();
                  }
                });
              } else {
                expect(actionElements.count()).toBe(0);
              }
            });
          });
        });
      });
    });
  });
});
