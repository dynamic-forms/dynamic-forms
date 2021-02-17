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
          it('has url, title and form', async (done) => {
            await page.navigateToExample(example);

            expect(await page.getUrl()).toContain(`/examples/${theme}/${example.id}`);

            expect(await page.findFormRoot().isPresent()).toBe(true);
            expect(await page.findFormWrapper().isPresent()).toBe(true);
            expect(await page.findForm().isPresent()).toBe(true);
            expect(await page.findFormElements().count()).toBeGreaterThan(0);

            const actions = page.findFormActions();
            const actionsCount = await actions.count();

            const modalOpenButton = page.findFormModalOpenButton();
            const modalOpenButtonPresent = await modalOpenButton.isPresent();

            let controls = page.findFormControls();
            let controlsCount = await controls.count();

            if (actionsCount !== 0 && controlsCount === 0) {
              const fieldAddButton = page.findFormFieldAddButton();
              if (await fieldAddButton.isPresent()) {
                await fieldAddButton.click();
                controls = page.findFormControls();
                controlsCount = await controls.count();
              }
            }

            if (controlsCount === 0) {
              expect(await page.findFormActionWrappers().isPresent()).toBe(false);
              expect(actionsCount).toBe(0);

              if (modalOpenButtonPresent) {
                await modalOpenButton.click();

                expect(await page.findFormModal().isPresent()).toBe(true);
              }
            } else {
              const validateButton = page.findFormValidateButton();
              const resetButton = page.findFormResetButton();
              const resetDefaultButton = page.findFormResetDefaultButton();

              if (await validateButton.isPresent()) {
                await validateButton.click();
              }

              if (await resetButton.isPresent() && await resetButton.isEnabled()) {
                await resetButton.click();
              }

              if (await validateButton.isPresent()) {
                await validateButton.click();
              }

              if (await resetDefaultButton.isPresent() && await resetDefaultButton.isEnabled()) {
                await resetDefaultButton.click();
              }

              if (await validateButton.isPresent()) {
                await validateButton.click();
              }

              if (modalOpenButtonPresent) {
                await modalOpenButton.click();

                expect(await page.findFormModal().isPresent()).toBe(true);

                controls = page.findFormModalControls();
              }

              const controlCount = await controls.count();
              for (let index = 0; index < controlCount; index++) {
                const control = new Control(controls.get(index), theme);

                expect(await control.isPresent()).toBe(true);
                expect(await control.getControlType()).toBeTruthy();

                const input = await control.getInput();

                expect(await input.isPresent()).toBe(true);

                const isEditable = await input.isEditable();
                if (isEditable) {
                  if (!await input.getInputValue() || await input.isInputForFalse()) {
                    await input.editInputValue();
                    await page.pressEscape();
                  }

                  expect(await input.checkInputValue()).toBe(true);
                }
              }

              if (modalOpenButtonPresent) {
                const modalCloseButton = page.findFormModalCloseButton();
                if (await modalCloseButton.isPresent()) {
                  await modalCloseButton.click();
                }
              }

              const submitButton = page.findFormSubmitButton();
              if (await submitButton.isPresent() && await submitButton.isEnabled()) {
                await submitButton.click();
              }
            }

            done();
          }, 60000);
        });
      });
    });
  });
});
