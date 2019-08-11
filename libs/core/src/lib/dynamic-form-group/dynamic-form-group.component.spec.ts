import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';
import { DynamicFormValidationComponent } from '../dynamic-form-validation/dynamic-form-validation.component';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

describe('DynamicFormGroupComponent', () => {
  let fixture: ComponentFixture<DynamicFormGroupComponent>;
  let component: DynamicFormGroupComponent;
  let form: DynamicForm;
  let formGroup: DynamicFormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        DynamicFormGroupComponent,
        DynamicFormFieldComponent,
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

    fixture = TestBed.createComponent(DynamicFormGroupComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    formGroup = new DynamicFormGroup(form, form, <DynamicFormGroupDefinition>{
      key: 'key',
      template: {},
      fields: []
    });
    component.field = formGroup;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
    expect(component.template).toBeDefined();
    expect(component.control).toBeDefined();
    expect(component.fields).toEqual([]);
  });

  it('creates component template', () => {
    const formGroupDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-group'));
    const formGroupLabelDebugElement = formGroupDebugElement.query(By.css('div.dynamic-form-group-label'));
    const formGroupValidationDebugElement = formGroupDebugElement.query(By.css('dynamic-form-validation'));
    const formGroupElement = <HTMLElement>formGroupDebugElement.nativeElement;
    const formGroupLabelElement = <HTMLElement>formGroupLabelDebugElement.nativeElement;
    const formGroupValidationComponent = <DynamicFormValidationComponent>formGroupValidationDebugElement.componentInstance;

    expect(formGroupElement).toBeDefined();
    expect(formGroupLabelElement).toBeDefined();
    expect(formGroupValidationComponent.errors).toBe(component.control.errors);
  });

  it('sets dynamic form group to hidden', () => {
    const formGroupDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-group'));
    const formGroupElement = <HTMLElement>formGroupDebugElement.nativeElement;

    expect(formGroupElement.className).not.toContain('hidden');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formGroupElement.className).toContain('hidden');
  });

  it('sets dynamic form group to readonly', () => {
    const formGroupDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-group'));
    const formGroupElement = <HTMLElement>formGroupDebugElement.nativeElement;

    expect(formGroupElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formGroupElement.className).toContain('readonly');
  });
});
