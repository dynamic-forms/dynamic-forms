import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicFormValidationComponent } from '../dynamic-form-validation/dynamic-form-validation.component';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';
import { DynamicFormControlComponent } from './dynamic-form-control.component';

@Component({
  selector: 'dynamic-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputComponent {}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormControlComponent,
    DynamicFormValidationComponent,
    DynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DynamicFormConfigService,
      useValue: new DynamicFormConfigService({
        module: 'core',
        inputConfig: {
          types: [
            { type: 'input', component: DynamicFormInputTestComponent }
          ]
        }
      })
    },
    DynamicFormComponentFactory
  ],
  entryComponents: [
    DynamicFormInputTestComponent
  ]
})
class DynamicFormControlComponentTestModule {}

describe('DynamicFormControlComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormControlComponentTestModule
      ]
    }).compileComponents();
  }));

  it('creates component', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const field = new DynamicFormControl(root, root, <DynamicFormControlTemplate>{
      key: 'key',
      input: {
        type: 'input'
      }
    });

    const fixture = TestBed.createComponent(DynamicFormControlComponent);
    const component = fixture.componentInstance;
    component.field = field;

    fixture.detectChanges();

    expect(component.id).toBe('key');
    expect(component.template).toBeDefined();
    expect(component.control).toBeDefined();
    expect(component.input).toBeDefined();
  });
});
