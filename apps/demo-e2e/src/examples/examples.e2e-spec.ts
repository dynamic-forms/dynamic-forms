import { ExamplesMenu, ExamplesMenuItem } from 'apps/demo/src/app/layout/header/examples-menu/examples-menu';
import { Control } from './elements';
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
            expect(await page.findActionsElement().isPresent()).toBe(true);
            expect(await page.findFormElements().count()).toBeGreaterThan(0);

            const controlElements = page.findControlElements();
            const actionElements = page.findActionElements();

            if (await controlElements.count() === 0) {
              expect(await actionElements.count()).toBe(0);
            } else {
              const actionButtonElements = page.findActionButtonElements();
              const validateButtonElement = page.findValidateButtonElement();
              const submitButtonElement = page.findSubmitButtonElement();

              expect(await actionElements.count()).toBeGreaterThan(0);
              expect(await actionButtonElements.count()).toBeGreaterThan(0);

              const validateButtonPresent = await validateButtonElement.isPresent();
              if (validateButtonPresent) {
                await validateButtonElement.click();
              }

              const controlElementCount = await controlElements.count();
              for (let index = 0; index < controlElementCount; index++) {
                const controlElement = controlElements.get(index);
                const control = new Control(controlElement, theme);
                const controlInfo = await control.getControlInfo();

                expect(controlInfo.type).toBeDefined();
                expect(controlInfo.isPresent).toBe(true);

                const input = await control.getInput();
                const inputInfo = await input.getInputInfo();

                expect(inputInfo.isPresent).toBe(true);

                const editable = !(controlInfo.readonly || inputInfo.readonly || inputInfo.disabled);
                if (editable) {
                  if (!inputInfo.value) {
                    await input.editInputValue();
                    await page.closeOverlayBackdrop();
                  }

                  expect(await input.getInputValue()).toBeTruthy();
                }
              }

              const submitButtonPresent = await submitButtonElement.isPresent();
              if (submitButtonPresent) {
                return await submitButtonElement.click();
              }

              return Promise.resolve();
            }
          });
        });
      });
    });
  });
});
