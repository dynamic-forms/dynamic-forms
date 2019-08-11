import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormComponentFactory, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDefinition, DynamicFormInputComponent,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormControlComponent} from './dynamic-form-control.component';
import { BsDynamicFormControlModule } from './dynamic-form-control.module';

@Component({
  selector: 'bs-dynamic-input-test',
  template: `<div>Dynamic Input</div>`
})
class BsDynamicFormInputTestComponent extends DynamicFormInputComponent {}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDynamicFormControlModule
  ],
  declarations: [
    BsDynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DynamicFormConfigService,
      useValue: new DynamicFormConfigService({
        module: 'bootstrap',
        inputConfig: {
          types: [
            { type: 'input', component: BsDynamicFormInputTestComponent }
          ]
        }
      })
    },
    DynamicFormValidationService,
    DynamicFormComponentFactory
  ],
  entryComponents: [
    BsDynamicFormInputTestComponent
  ]
})
class BsDynamicFormControlComponentTestModule {}

describe('BsDynamicFormControlComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormControlComponent>;
  let component: BsDynamicFormControlComponent;
  let form: DynamicForm;
  let formControl: DynamicFormControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlComponentTestModule
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormControlComponent);
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
