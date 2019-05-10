import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormValidationComponent);
    component = fixture.componentInstance;
  }));

  it('creates component', () => {
    fixture.detectChanges();

    expect(component).toBeDefined();
  });

  it('creates component template', () => {
    const getDebugElement = () => fixture.debugElement.query(By.css('.dynamic-form-validation'));

    fixture.detectChanges();

    expect(getDebugElement()).toBeNull();

    component.errors = {};

    fixture.detectChanges();

    const debugElement = getDebugElement();
    const element = <HTMLElement>debugElement.nativeElement;

    expect(debugElement).not.toBeNull();
    expect(element.innerHTML).toBe('The field is invalid');
  });

  it('returns message from error', () => {
    component.errors = { email: { message: 'The field is not a valid email' } };

    expect(component.errorMessage).toEqual( 'The field is not a valid email');
  });

  it('returns message from config', () => {
    component.errors = { required: {} };

    expect(component.errorMessage).toEqual(validationConfig.messages.required);
  });

  it('returns default message from config', () => {
    component.errors = {};

    expect(component.errorMessage).toEqual(validationConfig.defaultMessage);
  });
});
