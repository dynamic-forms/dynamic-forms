import { ExamplesMenu, ExampleMenu, ExampleMenuGroup, ExampleMenuItem } from 'apps/demo/src/app/state/examples/examples.model';
import examplesConfig from '../../../demo/src/assets/examples-menu.json';
import { Example, ExamplesPage } from './examples.po';


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

            const url = await page.getUrl();

            expect(url).toContain(`/examples/${theme}/${example.id}`);

            const formTestResult = await page.getFormTestResult();
            expect(formTestResult.rootPresent).toBe(true);
            expect(formTestResult.wrapperPresent).toBe(true);
            expect(formTestResult.formPresent).toBe(true);

            if (formTestResult.actionCount !== 0 && formTestResult.controlCount === 0) {
              const formFieldAddButton = page.findFormFieldAddButton();
              if (await formFieldAddButton.isPresent()) {
                await formFieldAddButton.click();
              }
            }

            const formActionTestResult = await page.getFormActionTestResult();
            expect(formActionTestResult.actionCount).toBe(formTestResult.actionCount);
            expect(formActionTestResult.buttonCount + formActionTestResult.anchorCount).toBe(formTestResult.actionCount);

            const formModalTestResult = await page.getFormModalTestResults();
            if (formModalTestResult.modalOpenButtonPresent) {
              expect(formModalTestResult.modalPresent).toBe(true);
              expect(formModalTestResult.modalCloseButtonPresent).toBe(true);
            }

            const controls = formModalTestResult.modalControls || formTestResult.controls;
            const controlTestResults = await page.getFormControlTestResults(controls);
            for (const controlTestResult of controlTestResults.values()) {
              expect(controlTestResult.type).toBeTruthy();
              expect(controlTestResult.present).toBe(true);
              expect(controlTestResult.inputPresent).toBe(true);
              if (controlTestResult.inputEditable) {
                expect(controlTestResult.inputValuePassed).toBe(true);
              }
            }

            const formItemsTestResult = await page.getFormItemsTestResult(theme);
            for (let headerIndex = 1; headerIndex < formItemsTestResult.itemHeaderCount; headerIndex++) {
              const itemHeader = formItemsTestResult.itemHeaders.get(headerIndex);
              const itemHeaderClassName = await itemHeader.getAttribute('class');
              const itemHeaderPresent = await itemHeader.isPresent();
              const itemHeaderDisabled = itemHeaderClassName.includes('disabled');
              if (itemHeaderPresent && !itemHeaderDisabled) {
                await itemHeader.click();
              }

              const item = page.getFormItemLast(formItemsTestResult.items);
              const itemControls = page.getFormControls(item);
              const itemControlTestResults = await page.getFormControlTestResults(itemControls);
              for (const itemControlTestResult of itemControlTestResults.values()) {
                expect(itemControlTestResult.type).toBeTruthy();
                expect(itemControlTestResult.present).toBe(true);
                expect(itemControlTestResult.inputPresent).toBe(true);
                if (itemControlTestResult.inputEditable) {
                  expect(itemControlTestResult.inputValuePassed).toBe(true);
                }
              }
            }

            if (formTestResult.controlCount !== 0 && formModalTestResult.modalCloseButtonPresent) {
              await formModalTestResult.modalCloseButton.click();
            }

            const submitButton = page.findFormSubmitButton();
            if (await submitButton.isPresent() && await submitButton.isEnabled()) {
              await submitButton.click();
            }
          });
        });
      });
    });
  });
});
