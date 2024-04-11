import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DynamicFormComponent,
  withDynamicFormColors,
  withDynamicFormControlValidatorFactory,
  withDynamicFormIcons,
} from '@dynamic-forms/core';
import { provideDynamicFormsMarkdown } from '@dynamic-forms/markdown';
import { provideMatDynamicFormsWithDefaultFeatures } from '@dynamic-forms/material';
import { withMatDynamicFormInputMask } from '@dynamic-forms/material/input-mask';
import { v4 } from 'uuid';
import { dynamicFormControlUniqueUsernameValidatorTypeFactory } from '../dynamic-form-extensions';
import { FormBase } from '../form-base';

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
  withMatDynamicFormInputMask(),
  withDynamicFormControlValidatorFactory(dynamicFormControlUniqueUsernameValidatorTypeFactory, [HttpClient]),
];

const providers = [
  ...provideDynamicFormsMarkdown(),
  ...provideMatDynamicFormsWithDefaultFeatures(config, ...features),
  ...provideNativeDateAdapter(),
];

@Component({
  standalone: true,
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.scss',
  imports: [DynamicFormComponent],
  providers,
})
export class MaterialFormComponent extends FormBase {
  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }
}
