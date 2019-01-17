import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  template = <any>{
    fields: [{
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
      fields: [{
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
      fields: [{
        key: 'name',
        label: 'Name',
        type: 'control',
        input: {
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
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
        validation: {
          required: true,
          email: true
        }
      }, {
        key: 'address',
        type: 'group',
        label: 'Address',
        fields: [{
          key: 'street',
          type: 'control',
          label: 'Street',
          input: {
            type: 'text',
            placeholder: 'Enter your street'
          },
          validation: {
            required: true,
            minLength: 5,
            maxLength: 10
          }
        }]
      }, {
        key: 'password',
        type: 'control',
        label: 'Password',
        input: {
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        }
      }]
    },
    {
      key: 'underlying',
      type: 'group',
      label: 'Underlying',
      fields: [{
        key: 'currencyPair',
        type: 'control',
        label: 'Currency pair',
        input: {
          type: 'select',
          placeholder: 'Select the currency pair',
          options: [
            { value: 'EURUSD', label: 'EUR/USD' },
            { value: 'EURGBP', label: 'EUR/GBP' }
          ]
        },
        validation: {
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
        validation: {
          required: true,
          min: 0,
          max: 20
        }
      }]
    }]
  };
  model = {
    loginEnabled: true,
    login: {
      email: 'user@mail.com'
    },
    register: {
      name: 'user',
      email: 'user@mail.com',
      address: {}
    }
  };
}
