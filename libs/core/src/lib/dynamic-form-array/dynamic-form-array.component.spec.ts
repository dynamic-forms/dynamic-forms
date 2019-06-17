import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicFormValidationComponent } from '../dynamic-form-validation/dynamic-form-validation.component';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

describe('DynamicFormArrayComponent', () => {
  let fixture: ComponentFixture<DynamicFormArrayComponent>;
  let component: DynamicFormArrayComponent;
  let form: DynamicForm;
  let formArray: DynamicFormArray;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        DynamicFormArrayComponent,
        DynamicFormValidationComponent
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({ module: 'core' })
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormArrayComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    formArray = new DynamicFormArray(form, form, <DynamicFormArrayTemplate>{
      key: 'key',
      fields: []
    });
    component.field = formArray;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.id).toBe('key');
    expect(component.template).toBeDefined();
    expect(component.control).toBeDefined();
    expect(component.fields).toEqual([]);
  });

  it('creates component template', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-array-label'));
    const formArrayValidationDebugElement = formArrayDebugElement.query(By.css('dynamic-form-validation'));
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;
    const formArrayLabelElement = <HTMLElement>formArrayLabelDebugElement.nativeElement;
    const formArrayValidationComponent = <DynamicFormValidationComponent>formArrayValidationDebugElement.componentInstance;

    expect(formArrayElement).toBeDefined();
    expect(formArrayLabelElement).toBeDefined();
    expect(formArrayValidationComponent.errors).toBe(component.control.errors);
  });

  it('sets dynamic form array to hidden', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;

    expect(formArrayElement.className).not.toContain('hidden');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formArrayElement.className).toContain('hidden');
  });
});
