import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  DynamicFormComponent,
  withDynamicFormColors,
  withDynamicFormControlValidatorFactory,
  withDynamicFormIcons,
} from '@dynamic-forms/core';
import { withDynamicFormsMarkdownFeatures } from '@dynamic-forms/markdown';
import { provideMatDynamicFormsWithDefaultFeatures, provideNativeDatetimeAdapter } from '@dynamic-forms/material';
import { withMatDynamicFormInputMask, withMatDynamicFormInputMaskConverters } from '@dynamic-forms/material/input-mask';
import { v4 } from 'uuid';
import { dynamicFormControlUniqueUsernameValidatorTypeFactory } from '../dynamic-form-extensions';
import { FormLoggerModule } from '../form-logger.module';

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
  imports: [DynamicFormComponent, FormLoggerModule],
  exports: [DynamicFormComponent, FormLoggerModule],
  providers: provideMaterialForm(),
})
export class MaterialFormModule {}
