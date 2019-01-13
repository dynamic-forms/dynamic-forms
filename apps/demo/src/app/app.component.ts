import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  template = <any>{
    items: [{
      key: 'loginEnabled',
      type: 'control',
      label: 'Login enabled',
      input: {
        type: 'checkbox'
      }
    },
    {
      key: 'login',
      type: 'group',
      label: 'Login',
      items: [{
        key: 'email',
        type: 'control',
        label: 'Email',
        input: {
          type: 'email',
          placeholder: 'Enter your email'
        },
        validators: {
          required: true,
          email: true
        }
      }, {
        key: 'password',
        type: 'control',
        label: 'Password',
        input: {
          type: 'password',
          placeholder: 'Enter your password'
        },
        validators: {
          required: true
        }
      }],
      expressions: {
        hidden: '!model.loginEnabled'
      }
    },
    {
      key: 'registerEnabled',
      type: 'control',
      label: 'Register enabled',
      input: {
        type: 'checkbox'
      }
    },
    {
      key: 'register',
      type: 'group',
      label: 'Register',
      items: [{
        key: 'name',
        label: 'Name',
        type: 'control',
        input: {
          type: 'text',
          placeholder: 'Enter your name'
        },
        validators: {
          required: true
        }
      }, {
        key: 'email',
        type: 'control',
        label: 'Email',
        input: {
          type: 'email',
          placeholder: 'Enter your email'
        },
        validators: {
          required: true,
          email: true
        }
      }, {
        key: 'password',
        type: 'control',
        label: 'Password',
        input: {
          type: 'password',
          placeholder: 'Enter your password'
        },
        validators: {
          required: true
        }
      }]
    },
    {
      key: 'underlying',
      type: 'group',
      label: 'Underlying',
      items: [{
        key: 'currencyPair',
        type: 'control',
        label: 'Currency pair',
        input: {
          type: 'select',
          placeholder: 'Select the currency pair'
        },
        validators: {
          required: true
        }
      }, {
        key: 'number',
        type: 'control',
        label: 'Notional',
        input: {
          type: 'number',
          placeholder: 'Enter the notional'
        },
        validators: {
          required: true
        }
      }]
    }]
  };
  model = {};
}
