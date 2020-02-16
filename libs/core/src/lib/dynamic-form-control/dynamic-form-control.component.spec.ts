import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DYNAMIC_FORM_LIBRARY } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';
import { DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlComponent } from './dynamic-form-control.component';
import { DynamicFormControlModule } from './dynamic-form-control.module';

@Component({
  selector: 'dynamic-input-test',
  template: `<div class="dynamic-form-input"></div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  imports: [
    DynamicFormControlModule
  ],
  declarations: [
    DynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_LIBRARY,
      useValue: { name: 'test' }
    },
    {
      provide: DYNAMIC_FORM_INPUT_TYPES,
      useValue: [
        { libraryName: 'test', type: 'input', component: DynamicFormInputTestComponent }
      ]
    },
    DynamicFormConfigService,
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

    form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    formControl = new DynamicFormControl(form, form, <DynamicFormControlDefinition>{
      id: 'id',
      key: 'key',
      index: 1,
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
    expect(component.id).toBe('id');
    expect(component.key).toBe('key');
    expect(component.index).toBe(1);
    expect(component.path).toBe('key');
    expect(component.template).toBeDefined();
    expect(component.control).toBeDefined();
    expect(component.input).toBeDefined();
    expect(component.hints).toBeDefined();
  });

  it('creates component template', () => {
    const formControlDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-control'));
    const formInputDebugElement = formControlDebugElement.query(By.css('div.dynamic-form-input'));
    const formControlElement = <HTMLElement>formControlDebugElement.nativeElement;
    const formInputElement = <HTMLElement>formInputDebugElement.nativeElement;

    expect(formControlElement).toBeDefined();
    expect(formInputElement).toBeDefined();
  });

  it('sets dynamic form control to hidden', () => {
    const formControlDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-control'));
    const formControlElement = <HTMLElement>formControlDebugElement.nativeElement;

    expect(formControlElement.className).toBe('dynamic-form-control');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formControlElement.className).toBe('dynamic-form-control hidden');
  });

  it('sets dynamic form control to readonly', () => {
    const formControlDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-control'));
    const formControlElement = <HTMLElement>formControlDebugElement.nativeElement;

    expect(formControlElement.className).toBe('dynamic-form-control');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formControlElement.className).toBe('dynamic-form-control readonly');
  });

  it('sets class name of dynamic form control', () => {
    const formControlDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-control'));
    const formControlElement = <HTMLElement>formControlDebugElement.nativeElement;

    expect(formControlElement.className).toBe('dynamic-form-control');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formControlElement.className).toBe('dynamic-form-control className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formControlElement.className).toBe('dynamic-form-control');
  });
});
