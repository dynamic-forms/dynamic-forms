import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideBsDynamicFormsWithDefaultFeatures } from '@dynamic-forms/bootstrap';
import { withBsDynamicFormInputMask, withBsDynamicFormInputMaskConverters } from '@dynamic-forms/bootstrap/input-mask';
import {
  DynamicFormComponent,
  withDynamicFormColors,
  withDynamicFormControlValidatorFactory,
  withDynamicFormIcons,
  withDynamicFormLoggerFactory,
} from '@dynamic-forms/core';
import { withDynamicFormsMarkdownFeatures } from '@dynamic-forms/markdown';
import { v4 } from 'uuid';
import { dynamicFormControlUniqueUsernameValidatorTypeFactory } from '../dynamic-form-extensions';
import { FormLogger, formLoggerTypeFactory } from '../form-logger';

const config = {
  theme: 'bootstrap',
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
  libraryName: 'bootstrap',
};

const colors = {
  colors: {
    inputAction: 'secondary',
  },
  libraryName: 'bootstrap',
};

const features = [
  withDynamicFormIcons(icons),
  withDynamicFormColors(colors),
  withBsDynamicFormInputMask(),
  withBsDynamicFormInputMaskConverters(),
  withDynamicFormControlValidatorFactory(dynamicFormControlUniqueUsernameValidatorTypeFactory, [HttpClient]),
  withDynamicFormLoggerFactory(formLoggerTypeFactory, [FormLogger]),
  ...withDynamicFormsMarkdownFeatures(),
];

export function provideBootstrapForm() {
  return provideBsDynamicFormsWithDefaultFeatures(config, ...features);
}

@NgModule({
  imports: [DynamicFormComponent],
  providers: [...provideBootstrapForm(), FormLogger],
  exports: [DynamicFormComponent],
})
export class BootstrapFormModule {}
