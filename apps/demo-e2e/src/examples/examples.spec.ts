import { expect, test } from '@playwright/test';
import { ExampleMenu, ExampleMenuGroup, ExampleMenuItem, ExamplesMenu } from 'apps/demo/src/app/state/examples/examples.model';
import examplesConfig from '../../../demo/src/assets/examples-menu.json';
import { Control } from './elements';

export interface Example {
  id: string;
  modelId: string;
  name: string;
}

export const getExamples = (items: ExampleMenuItem[], namePrefix?: string): Example[] =>
  items.reduce((result, item) => {
    const name = namePrefix ? `${namePrefix} - ${item.label}` : item.label;
    const group = item as ExampleMenuGroup;
    if (group.items && group.items.length) {
      return result.concat(getExamples(group.items, name));
    }
    const example = item as ExampleMenu;
    if (example.id) {
      return result.concat({ id: example.id, modelId: example.modelId, name });
    }
    return result;
  }, []);

test.describe('dynamic-forms demo examples', () => {
  const themes = ['bootstrap', 'material'];
  const examples = getExamples((examplesConfig as ExamplesMenu).items);

  themes.forEach(theme => {
    test.describe(`for theme ${theme}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`http://localhost:4200/examples/${theme}`);
      });

      test('has url and title', async ({ page }) => {
        await expect(page).toHaveURL(`/examples/${theme}`);
        await expect(page).toHaveTitle('dynamic-forms');
      });

      examples.forEach(example => {
        const description = example.modelId
          ? `for example "${example.name}" with id "${example.id}" and model id "${example.modelId}"`
          : `for example "${example.name}" with id "${example.id}"`;

        test.describe(description, () => {
          test('has url, title and form', async ({ page }, testInfo) => {
            const exampleUrl = example.modelId ? `${example.id}/models/${example.modelId}` : example.id;

            await page.goto(
              `http://localhost:4200/examples/${theme}/${exampleUrl}`,
              example.modelId ? { waitUntil: 'networkidle' } : undefined,
            );

            await expect(page).toHaveURL(`/examples/${theme}/${exampleUrl}`);

            const root = page.locator('css=dynamic-form');
            const wrapper = root.locator('css=.dynamic-form-wrapper');
            const form = wrapper.locator('css=form.dynamic-form');

            await expect(root).toBeVisible();
            await expect(wrapper).toBeVisible();
            await expect(form).toBeVisible();

            testInfo.attach('example-loaded', {
              body: await page.screenshot(),
              contentType: 'image/png',
            });

            const actions = form.locator('css=.dynamic-form-header,.dynamic-form-footer').locator('css=dynamic-form-element');
            const controls = form.locator('css=div.dynamic-form-control');

            const actionCount = await actions.count();
            const controlCount = await controls.count();

            if (actionCount !== 0 && controlCount === 0) {
              const formFieldAddButton = form.locator('css=button[id*="pushArrayField"],button[id*="registerDictionaryField"]');
              if (await formFieldAddButton.isVisible()) {
                await formFieldAddButton.click();
              }
            }

            if (actionCount !== 0) {
              const buttons = actions.locator('css=button');
              const anchors = actions.locator('css=a');

              const buttonCount = await buttons.count();
              const anchorCount = await anchors.count();

              expect(buttonCount + anchorCount).toBe(actionCount);

              const validateButton = actions.locator('css=button[id="action-validate"]').first();
              const resetButton = actions.locator('css=button[id="action-reset"]').first();
              const resetDefaultButton = actions.locator('css=button[id="action-reset-default"]').first();

              if ((await resetButton.isVisible()) && (await resetButton.isEnabled())) {
                await resetButton.click();
              }

              if ((await validateButton.isVisible()) && (await validateButton.isEnabled())) {
                await validateButton.click();
              }

              if ((await resetDefaultButton.isVisible()) && (await resetDefaultButton.isEnabled())) {
                await resetDefaultButton.click();
              }

              if ((await validateButton.isVisible()) && (await validateButton.isEnabled())) {
                await validateButton.click();
              }
            }

            const modal = page.locator('css=.dynamic-form-modal');
            const modalOpenButton = form.locator('css=button[id*="openModal"]');
            const modalCloseButton = modal.locator('css=button[id*="closeModal"]').first();

            if ((await modalOpenButton.isVisible()) && (await modalOpenButton.isEnabled())) {
              await modalOpenButton.click();

              await expect(modal).toBeVisible();
              await expect(modalCloseButton).toBeVisible();

              testInfo.attach('example-modal-opened', {
                body: await page.screenshot(),
                contentType: 'image/png',
              });
            }

            const itemsWrapper = form.locator('css=.dynamic-form-items');

            const items = itemsWrapper.locator(
              `css=${theme === 'material' ? '.mat-mdc-tab-body,.mat-expansion-panel-body' : '.dynamic-form-item'}`,
            );
            const itemCount = await items.count();

            const itemsHeaders = itemsWrapper.locator(
              `css=${theme === 'material' ? '.mdc-tab,.mat-expansion-panel-header' : '.dynamic-form-item-header'}`,
            );
            const itemHeaderCount = await itemsHeaders.count();

            const groups = itemCount > 0 ? items : (await modal.isVisible()) ? modal : form;
            const groupCount = await groups.count();

            for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
              const group = groups.nth(groupIndex);

              if (itemCount > 0 && groupIndex > 0 && groupIndex < itemHeaderCount) {
                const itemHeader = itemsHeaders.nth(groupIndex);
                const itemHeaderClass = await itemHeader.getAttribute('class');
                const itemHeaderVisible = await itemHeader.isVisible();
                const itemHeaderClassDisabled = itemHeaderClass.includes('disabled');
                const itemHeaderAriaDisabled = (await itemHeader.getAttribute('aria-disabled')) === 'true';
                const itemHeaderDisabled = itemHeaderClassDisabled || itemHeaderAriaDisabled;
                const itemHeaderExpanded = itemHeaderClass.includes('expanded');

                if (itemHeaderDisabled) {
                  continue;
                }

                if (itemHeaderVisible && !itemHeaderDisabled && !itemHeaderExpanded) {
                  await itemHeader.click();
                }
              }

              await expect(group).toBeVisible();

              const groupControls = group.locator('css=div.dynamic-form-control');
              const groupControlCount = await groupControls.count();

              for (let index = 0; index < groupControlCount; index++) {
                const locator = groupControls.nth(index);
                const control = new Control(theme, locator, page);
                const input = await control.getInput();

                const result = {
                  id: await input.getInputId(),
                  type: await control.getControlType(),
                  present: await control.isPresent(),
                  visible: await control.isVisible(),
                  inputPresent: await input.isPresent(),
                  inputVisible: await input.isVisible(),
                  inputEditable: await input.isEditable(),
                };

                expect(result.type).toBeTruthy();
                expect(result.present).toBe(true);
                expect(result.inputPresent).toBe(true);

                if (result.inputVisible && result.inputEditable) {
                  const inputValue = await input.getInputValue();
                  const inputForFalse = await input.isInputForFalse();

                  await expect(input.locator).toBeVisible();

                  if ((!inputValue && !inputForFalse) || (inputValue && inputForFalse)) {
                    await input.editInputValue();
                  }

                  // console.log({ id: result.id, inputValue: await input.getInputValue() });

                  expect(await input.checkInputValue(), `input with id '${result.id} failed value check'`).toBe(true);
                }
              }

              testInfo.attach(`example-edited-group-${groupIndex + 1}`, {
                body: await page.screenshot(),
                contentType: 'image/png',
              });
            }

            if (controlCount === 0) {
              return;
            }

            if ((await modalCloseButton.isVisible()) && (await modalCloseButton.isEnabled())) {
              await modalCloseButton.click();

              testInfo.attach('example-modal-closed', {
                body: await page.screenshot(),
                contentType: 'image/png',
              });
            }

            const submitButton = page.locator('css=.dynamic-form-header,.dynamic-form-footer').locator('css=button[id="action-submit"]');

            if ((await submitButton.isVisible()) && (await submitButton.isEnabled())) {
              await submitButton.click();

              const modal = page.locator('css=.dynamic-form-modal');
              const modalVisible = await modal.isVisible();

              if (!modalVisible) {
                const dialog = page.locator('css=app-form-submit-dialog');
                const content = dialog.locator('css=.mat-mdc-tab-body-content').first();
                const model = content.locator('css=pre');

                await expect(dialog).toBeVisible();
                await expect(content).toBeVisible();
                await expect(model).toBeVisible();

                testInfo.attach(`example-submitted-model`, {
                  body: await model.innerText(),
                  contentType: 'application/json',
                });
              }

              testInfo.attach(`example-submitted`, {
                body: await page.screenshot(),
                contentType: 'image/png',
              });
            }
          });
        });
      });
    });
  });
});
