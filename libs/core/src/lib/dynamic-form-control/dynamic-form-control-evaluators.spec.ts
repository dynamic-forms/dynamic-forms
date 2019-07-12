import { DynamicFormSelect } from '../dynamic-form-input/dynamic-form-select/dynamic-form-select';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlEvaluators } from './dynamic-form-control-evaluators';

describe('DynamicFormControlEvaluators', () => {
  it('evaluates control value of select', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {
      'key': 'option1'
    });
    const definition = <DynamicFormControlDefinition<DynamicFormSelect>>{
      key: 'key',
      template: {
        input: {
          type: 'select',
          options: [
            { value: 'option1', label: 'Option1' },
            { value: 'option2', label: 'Option2' },
            {
              label: 'Option Group',
              items: [
                { value: 'option3', label: 'Option3' },
                { value: 'option4', label: 'Option4' }
              ]
            }
          ]
        }
      }
    };
    const formControl = new DynamicFormControl(root, root, definition);
    formControl.template.input.options = [
      { value: 'option1', label: 'Option1' },
      { value: 'option2', label: 'Option2' }
    ];

    DynamicFormControlEvaluators.evalSelect(formControl);

    expect(formControl.control.value).toBe('option1');

    formControl.template.input.options = <any[]>[
      { value: 'option2', label: 'Option2' },
      { value: 'option3', label: 'Option3' }
    ];

    DynamicFormControlEvaluators.evalSelect(formControl);

    expect(formControl.control.value).toBeNull();
  });
});
