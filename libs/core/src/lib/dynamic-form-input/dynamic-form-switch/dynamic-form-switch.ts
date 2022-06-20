import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';

export interface DynamicFormSwitch extends DynamicFormInput<boolean> {
  type: 'switch';
}

export type DynamicFormSwitchDefinition = DynamicFormInputDefinition<DynamicFormSwitch>;

export class DynamicFormSwitchControl extends DynamicFormInputControl<DynamicFormSwitch> {}
