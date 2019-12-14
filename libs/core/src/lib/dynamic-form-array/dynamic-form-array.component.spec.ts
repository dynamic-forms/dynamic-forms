import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';
import { DynamicFormArrayModule } from './dynamic-form-array.module';

describe('DynamicFormArrayComponent', () => {
  let fixture: ComponentFixture<DynamicFormArrayComponent>;
  let component: DynamicFormArrayComponent;
  let form: DynamicForm;
  let formArray: DynamicFormArray;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormArrayModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({ library: 'core' })
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormArrayComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    formArray = new DynamicFormArray(form, form, <DynamicFormArrayDefinition>{
      key: 'key',
      template: {
        label: 'label'
      },
      elements: []
    });
    component.field = formArray;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.id).toBe('key');
    expect(component.control).toBeDefined();
    expect(component.fields).toEqual([]);
    expect(component.template).toBeDefined();
  });

  it('creates component template', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-array-label'));
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;
    const formArrayLabelElement = <HTMLElement>formArrayLabelDebugElement.nativeElement;

    expect(formArrayElement).toBeDefined();
    expect(formArrayLabelElement).toBeDefined();
  });

  it('hides dynamic form array label', () => {
    component.template.label = null;
    fixture.detectChanges();

    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-array-label'));

    expect(formArrayLabelDebugElement).toBeNull();
  });

  it('sets dynamic form array to hidden', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;

    expect(formArrayElement.className).toBe('dynamic-form-array');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-array hidden');
  });

  it('sets dynamic form array to readonly', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;

    expect(formArrayElement.className).toBe('dynamic-form-array');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-array readonly');
  });

  it('sets class name of dynamic form array', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;

    expect(formArrayElement.className).toBe('dynamic-form-array');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-array className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-array');
  });
});
