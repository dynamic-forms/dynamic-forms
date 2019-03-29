import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DYNAMIC_FORM_CONFIG } from '../dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormValidationComponent } from './dynamic-form-validation.component';
import { DynamicFormValidationConfig } from './dynamic-form-validation-config';

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
        DynamicFormConfigService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormValidationComponent);
    component = fixture.componentInstance;
  }));

  it('creates component', () => {
    fixture.detectChanges();

    expect(component).toBeDefined();
  });

  it('returns message from error', () => {
    component.errors = { email: { message: 'The field is not a valid email' } };

    expect(component.message).toEqual( 'The field is not a valid email');
  });

  it('returns message from config', () => {
    component.errors = { required: {} };

    expect(component.message).toEqual(validationConfig.messages.required);
  });

  it('returns default message from config', () => {
    component.errors = {};

    expect(component.message).toEqual(validationConfig.defaultMessage);
  });
});
