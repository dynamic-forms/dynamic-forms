import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DYNAMIC_FORM_CONFIG } from '../dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormValidationConfig } from './dynamic-form-validation-config';
import { DynamicFormValidationComponent } from './dynamic-form-validation.component';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

describe('DynamicFormValidationComponent', () => {
  const validationConfig: DynamicFormValidationConfig = {
    defaultMessage: 'The field is invalid',
    messages: {
      required: 'The field is required'
    }
  };

  let fixture: ComponentFixture<DynamicFormValidationComponent>;
  let component: DynamicFormValidationComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormValidationComponent
      ],
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: {
            module: 'test',
            validationConfig: validationConfig
          }
        },
        DynamicFormConfigService,
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormValidationComponent);
    component = fixture.componentInstance;

    component.field = <DynamicFormField>{
      control: new FormControl()
    };
  }));

  it('creates component', () => {
    fixture.detectChanges();

    expect(component).toBeDefined();
  });

  it('creates component template without validation element', () => {
    fixture.detectChanges();

    expect(component).toBeDefined();

    const debugElement = fixture.debugElement.query(By.css('.dynamic-form-validation'));

    expect(debugElement).toBeNull();
  });

  it('creates component template with validation element and error message', () => {
    component.control.setErrors({});
    component.control.markAsTouched();

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.dynamic-form-validation'));
    const element = <HTMLElement>debugElement.nativeElement;

    expect(debugElement).not.toBeNull();
    expect(element.innerHTML).toBe('The field is invalid');
  });

  it('errors returns errors from control', () => {
    const errors = { email: { message: 'The field is not a valid email' } };

    component.control.setErrors(errors);

    expect(component.errors).toEqual(errors);
  });

  it('errorMessage returns message from error', () => {
    component.control.setErrors({ email: { message: 'The field is not a valid email' } });

    expect(component.errorMessage).toEqual( 'The field is not a valid email');
  });

  it('errorMessage returns message from config', () => {
    component.control.setErrors({ required: {} });

    expect(component.errorMessage).toEqual(validationConfig.messages.required);
  });

  it('errorMessage returns default message from config for unknown error', () => {
    component.control.setErrors({ pattern: {} });

    expect(component.errorMessage).toEqual(validationConfig.defaultMessage);
  });

  it('errorMessage returns default message from config for unspecified error', () => {
    component.control.setErrors({});

    expect(component.errorMessage).toEqual(validationConfig.defaultMessage);
  });

  it('showErrorMessage returns false if no errors exist', () => {
    component.control.setErrors(null);

    expect(component.showErrorMessage).toBe(false);
  });

  it('showErrorMessage returns false if errors exist but control is untouched', () => {
    component.control.setErrors({});

    expect(component.showErrorMessage).toBe(false);
  });

  it('showErrorMessage returns true if errors exist and control is touched', () => {
    component.control.setErrors({});
    component.control.markAsTouched();

    expect(component.showErrorMessage).toBe(true);
  });
});
