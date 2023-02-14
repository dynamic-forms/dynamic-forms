import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormSelect } from '../dynamic-form-input/dynamic-form-select/dynamic-form-select';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { dynamicFormControlEvaluatorTypes, dynamicFormSelectEvaluatorFn,
  dynamicFormSelectEvaluatorType } from './dynamic-form-control-evaluator-type';

describe('DynamicFormControlEvaluatorType', () => {
  describe('dynamicFormControlEvaluatorTypes', () => {
    it('provides evaluator types', () => {
      expect(dynamicFormControlEvaluatorTypes.length).toBe(1);
      expect(dynamicFormControlEvaluatorTypes[0]).toBe(dynamicFormSelectEvaluatorType);
    });
  });

  describe('dynamicFormSelectEvaluatorType', () => {
    it('provides evaluator type property', () => {
      expect(dynamicFormSelectEvaluatorType.type).toBe('select');
      expect(dynamicFormSelectEvaluatorType.inputType).toBe('select');
      expect(dynamicFormSelectEvaluatorType.func).toBe(dynamicFormSelectEvaluatorFn);
    });

    it('func evaluates control model', () => {
      const definition = {
        key: 'key',
        template: {
          input: {
            type: 'select',
            options: [
              { value: 'option1', label: 'Option1' },
              { value: 'option2', label: 'Option2' },
              {
                label: 'Option Group 1',
                items: [
                  { value: 'option3', label: 'Option3' },
                  { value: 'option4', label: 'Option4' },
                ],
              },
              {
                label: 'Option Group 2',
                items: [
                  { value: 'option5', label: 'Option5' },
                  { value: 'option6', label: 'Option6' },
                ],
              },
            ],
          },
        },
      } as DynamicFormControlDefinition<string | string[], DynamicFormSelect<string>>;

      const builder: DynamicFormBuilder = {} as any;
      const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, { key: null });
      const type = {} as DynamicFormFieldType;
      const formControl = new DynamicFormControl<string | string[], DynamicFormSelect<string>>(builder, form, form, definition, type);

      dynamicFormSelectEvaluatorType.func(formControl);

      expect(formControl.model).toBeNull();
      expect(formControl.value).toBeNull();

      formControl.patchModel('option1');

      dynamicFormSelectEvaluatorType.func(formControl);

      expect(formControl.model).toBe('option1');
      expect(formControl.value).toBe('option1');

      formControl.template.input.multiple = true;

      dynamicFormSelectEvaluatorType.func(formControl);

      expect(formControl.model).toEqual([ 'option1' ]);
      expect(formControl.value).toEqual([ 'option1' ]);

      formControl.patchModel([ 'option1', 'option2', 'option4', 'option5', 'option6' ]);

      dynamicFormSelectEvaluatorType.func(formControl);

      expect(formControl.model).toEqual([ 'option1', 'option2', 'option4', 'option5', 'option6' ]);
      expect(formControl.value).toEqual([ 'option1', 'option2', 'option4', 'option5', 'option6' ]);

      formControl.template.input.options[2].items[1].disabled = true;
      formControl.template.input.options[3].disabled = true;

      dynamicFormSelectEvaluatorType.func(formControl);

      expect(formControl.model).toEqual([ 'option1', 'option2' ]);
      expect(formControl.value).toEqual([ 'option1', 'option2' ]);

      formControl.template.input.options = null;

      dynamicFormSelectEvaluatorType.func(formControl);

      expect(formControl.model).toEqual([]);
      expect(formControl.value).toEqual([]);

      formControl.template.input.multiple = false;

      dynamicFormSelectEvaluatorType.func(formControl);

      expect(formControl.model).toBeNull();
      expect(formControl.value).toBeNull();

      formControl.template.input.options = [
        { value: 'option1', label: 'Option1' },
      ];
      formControl.patchModel('option1');

      dynamicFormSelectEvaluatorType.func(formControl);

      expect(formControl.model).toBe('option1');
      expect(formControl.value).toBe('option1');

      formControl.template.input.multiple = true;
      formControl.template.input.options[0].disabled = true;

      dynamicFormSelectEvaluatorType.func(formControl);

      expect(formControl.model).toEqual([]);
      expect(formControl.value).toEqual([]);
    });
  });
});
