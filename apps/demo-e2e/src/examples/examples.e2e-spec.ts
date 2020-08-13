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

      it('has url and title', async () => {
        await page.navigateTo();

        expect(await page.getUrl()).toContain(`/examples/${theme}`);
        expect(await page.getTitle()).toEqual('dynamic-forms');
      });

      examples.forEach(example => {
        const description = example.modelId
          ? `for example "${example.name}" with id "${example.id}" and model id "${ example.modelId }"`
          : `for example "${example.name}" with id "${example.id}"`;

        describe(description, () => {
          it('has url, title and form', async () => {
            await page.navigateToExample(example);

            expect(await page.getUrl()).toContain(`/examples/${theme}/${example.id}`);

            expect(await page.findRootElement().isPresent()).toBe(true);
            expect(await page.findWrapperElement().isPresent()).toBe(true);
            expect(await page.findFormElement().isPresent()).toBe(true);
            expect(await page.findFormActionsElement().isPresent()).toBe(true);
            expect(await page.findFormElements().count()).toBeGreaterThan(0);

            const controlElements = page.findFormControlElements();
            const actionElements = page.findFormActionElements();

            if (await controlElements.count() > 0) {
              const actionButtonElements = page.findFormActionButtonElements();
              const validateButtonElement = page.findFormValidateButtonElement();

              expect(await actionElements.count()).toBeGreaterThan(0);
              expect(await actionButtonElements.count()).toBeGreaterThan(0);

              const isPresent = await validateButtonElement.isPresent();
              if (isPresent) {
                await validateButtonElement.click();
              }

              await controlElements.each(async controlElement => {
                const inputElement = page.findFormInputElement(controlElement);

                expect(await controlElement.isPresent()).toBe(true);
                expect(await inputElement.isPresent()).toBe(true);

                const isEditable = await page.isEditableFormControl(controlElement, inputElement);
                if (isEditable) {
                  expect(await page.editFormControl(controlElement, inputElement)).toBe(true);
                }
              });

            } else {
              expect(await actionElements.count()).toBe(0);
            }
          });
        });
      });
    });
  });
});
