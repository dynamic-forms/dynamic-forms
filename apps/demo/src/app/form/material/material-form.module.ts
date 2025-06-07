import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  DynamicFormComponent,
  withDynamicFormColors,
  withDynamicFormControlValidatorFactory,
  withDynamicFormIcons,
  withDynamicFormLoggerFactory,
} from '@dynamic-forms/core';
import { withDynamicFormsMarkdownFeatures } from '@dynamic-forms/markdown';
import { provideMatDynamicFormsWithDefaultFeatures, provideNativeDatetimeAdapter } from '@dynamic-forms/material';
import { withMatDynamicFormInputMask, withMatDynamicFormInputMaskConverters } from '@dynamic-forms/material/input-mask';
import { v4 } from 'uuid';
import { dynamicFormControlUniqueUsernameValidatorTypeFactory } from '../dynamic-form-extensions';
import { FormLogger, formLoggerTypeFactory } from '../form-logger';

const config = {
  theme: 'material',
  idBuilder: { createId: () => v4() },
};

const icons = {
  icons: {
    submit: 'send',
    validate: 'error',
    reset: 'delete',
    resetDefault: 'restore_page',
    push: 'add',
    pop: 'remove',
    remove: 'clear',
    clear: 'clear',
    moveDown: 'arrow_downward',
    moveUp: 'arrow_upward',
    register: 'add',
    maximizeModal: 'fullscreen',
    minimizeModal: 'fullscreen_exit',
  },
  libraryName: 'material',
};

const colors = {
  colors: {
    secondary: 'accent',
    danger: 'warn',
    warning: 'warn',
    inputAction: 'none',
  },
  libraryName: 'material',
};

const features = [
  withDynamicFormIcons(icons),
  withDynamicFormColors(colors),
  withDynamicFormControlValidatorFactory(dynamicFormControlUniqueUsernameValidatorTypeFactory, [HttpClient]),
  withMatDynamicFormInputMask(),
  withMatDynamicFormInputMaskConverters(),
  withDynamicFormLoggerFactory(formLoggerTypeFactory, [FormLogger]),
  ...withDynamicFormsMarkdownFeatures(),
];

export function provideMaterialForm() {
  return [
    ...provideMatDynamicFormsWithDefaultFeatures(config, ...features),
    ...provideNativeDateAdapter(),
    ...provideNativeDatetimeAdapter(),
  ];
}

@NgModule({
  imports: [DynamicFormComponent],
  providers: [...provideMaterialForm(), FormLogger],
  exports: [DynamicFormComponent],
})
export class MaterialFormModule {}
