import { Component } from '@angular/core';

@Component({
  selector: 'app-examples-menu',
  templateUrl: './examples-menu.component.html',
  styleUrls: ['./examples-menu.component.scss']
})
export class ExamplesMenuComponent {
  templates = [
    { id: 'inputs', label: 'Inputs' },
    { id: 'inputs-placeholder', label: 'Inputs with placeholder' },
    { id: 'inputs-default-value', label: 'Inputs with default value' },
    { id: 'inputs-readonly', label: 'Inputs readonly' },
    { id: 'inputs-disabled', label: 'Inputs disabled' },
    { id: 'login', label: 'Login' },
    { id: 'register', label: 'Register' },
    { id: 'finance', label: 'Finance' }
  ];
}
