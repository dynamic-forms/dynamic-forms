import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideBsDynamicFormsWithDefaultFeatures } from '@dynamic-forms/bootstrap';
import { withBsDynamicFormInputMask } from '@dynamic-forms/bootstrap/input-mask';
import {
  DynamicFormComponent,
  withDynamicFormColors,
  withDynamicFormControlValidatorFactory,
  withDynamicFormIcons,
} from '@dynamic-forms/core';
import { withDynamicFormsMarkdownFeatures } from '@dynamic-forms/markdown';
import { v4 } from 'uuid';
import { dynamicFormControlUniqueUsernameValidatorTypeFactory } from '../dynamic-form-extensions';

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
  withDynamicFormControlValidatorFactory(dynamicFormControlUniqueUsernameValidatorTypeFactory, [HttpClient]),
  ...withDynamicFormsMarkdownFeatures(),
];

@NgModule({
  imports: [DynamicFormComponent],
  exports: [DynamicFormComponent],
  providers: [...provideBsDynamicFormsWithDefaultFeatures(config, ...features)],
})
export class BootstrapFormModule {}

/*
@NgModule({
  imports: [BsDynamicFormsModule.withDefaultFeatures(config, ...features)],
  exports: [BsDynamicFormsModule],
})
export class BootstrapFormModuleWorkaround {}
*/
