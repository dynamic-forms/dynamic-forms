import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { provideBsDynamicFormsWithDefaultFeatures } from '@dynamic-forms/bootstrap';
import { withBsDynamicFormInputMask } from '@dynamic-forms/bootstrap/input-mask';
import {
  DynamicFormComponent,
  withDynamicFormColors,
  withDynamicFormControlValidatorFactory,
  withDynamicFormIcons,
} from '@dynamic-forms/core';
import { provideDynamicFormsMarkdown } from '@dynamic-forms/markdown';
import { v4 } from 'uuid';
import { dynamicFormControlUniqueUsernameValidatorTypeFactory } from '../dynamic-form-extensions';
import { FormBase } from '../form-base';

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
];

const providers = [...provideDynamicFormsMarkdown(), ...provideBsDynamicFormsWithDefaultFeatures(config, ...features)];

@Component({
  standalone: true,
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrl: './bootstrap-form.component.scss',
  imports: [DynamicFormComponent],
  providers,
})
export class BootstrapFormComponent extends FormBase {
  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }
}
