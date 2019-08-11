import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicFormValidationComponent } from '../dynamic-form-validation/dynamic-form-validation.component';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
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
    DynamicFormValidationService,
    DynamicFormComponentFactory
  ],
  entryComponents: [
    DynamicFormInputTestComponent
  ]
})
class DynamicFormControlComponentTestModule {}

describe('DynamicFormControlComponent', () => {
  let fixture: ComponentFixture<DynamicFormControlComponent>;
  let component: DynamicFormControlComponent;
  let form: DynamicForm;
  let formControl: DynamicFormControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormControlComponentTestModule
      ]
    });

    fixture = TestBed.createComponent(DynamicFormControlComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    formControl = new DynamicFormControl(form, form, <DynamicFormControlDefinition>{
      key: 'key',
      template: {
        input: {
          type: 'input'
        },
        hints: {}
      }
    });
    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.id).toBe('key');
    expect(component.template).toBeDefined();
    expect(component.control).toBeDefined();
    expect(component.input).toBeDefined();
    expect(component.hints).toBeDefined();
  });

  it('creates component template', () => {
    const formControlDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-control'));
    const formControlLabelDebugElement = formControlDebugElement.query(By.css('label'));
    const formControlValidationDebugElement = formControlDebugElement.query(By.css('dynamic-form-validation'));
    const formControlElement = <HTMLElement>formControlDebugElement.nativeElement;
    const formControlLabelElement = <HTMLElement>formControlLabelDebugElement.nativeElement;
    const formControlValidationComponent = <DynamicFormValidationComponent>formControlValidationDebugElement.componentInstance;

    expect(formControlElement).toBeDefined();
    expect(formControlLabelElement).toBeDefined();
    expect(formControlValidationComponent.errors).toBe(component.control.errors);
  });

  it('sets dynamic form control to hidden', () => {
    const formControlDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-control'));
    const formControlElement = <HTMLElement>formControlDebugElement.nativeElement;

    expect(formControlElement.className).not.toContain('hidden');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formControlElement.className).toContain('hidden');
  });

  it('sets dynamic form control to readonly', () => {
    const formControlDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-control'));
    const formControlElement = <HTMLElement>formControlDebugElement.nativeElement;

    expect(formControlElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formControlElement.className).toContain('readonly');
  });
});
