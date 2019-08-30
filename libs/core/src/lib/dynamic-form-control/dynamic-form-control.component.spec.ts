import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlComponent } from './dynamic-form-control.component';
import { DynamicFormControlModule } from './dynamic-form-control.module';

@Component({
  selector: 'dynamic-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputComponent {
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
      provide: DynamicFormConfigService,
      useValue: new DynamicFormConfigService({
        library: 'core',
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
    const formControlElement = <HTMLElement>formControlDebugElement.nativeElement;

    expect(formControlElement).toBeDefined();
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
