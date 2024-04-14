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
import { MatDynamicFormsModule, provideMatDynamicFormsWithDefaultFeatures } from '@dynamic-forms/material';
import { withMatDynamicFormInputMask } from '@dynamic-forms/material/input-mask';
import { v4 } from 'uuid';
import { dynamicFormControlUniqueUsernameValidatorTypeFactory } from '../dynamic-form-extensions';

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
  ...withDynamicFormsMarkdownFeatures(),
];

@NgModule({
  imports: [DynamicFormComponent],
  exports: [DynamicFormComponent],
  providers: [...provideMatDynamicFormsWithDefaultFeatures(config, ...features), ...provideNativeDateAdapter()],
})
export class MaterialFormModule {}

/*
const featuresWorkaround = [
  withDynamicFormIcons(icons),
  withDynamicFormColors(colors),
  withDynamicFormControlValidatorFactory(dynamicFormControlUniqueUsernameValidatorTypeFactory, [HttpClient]),
];
*/

@NgModule({
  imports: [MatDynamicFormsModule.forRoot(config, ...features)],
  exports: [MatDynamicFormsModule],
  providers: [...provideNativeDateAdapter()],
})
export class MaterialFormModuleWorkaround {}
