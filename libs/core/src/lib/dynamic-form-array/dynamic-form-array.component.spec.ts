import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockService } from 'ng-mocks';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

describe('DynamicFormArrayComponent', () => {
  let fixture: ComponentFixture<DynamicFormArrayComponent>;
  let component: DynamicFormArrayComponent;
  let form: DynamicForm;
  let formArray: DynamicFormArray;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        {
          provide: DynamicFormBuilder,
          useValue: builder,
        },
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(DynamicFormArrayComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    formArray = new DynamicFormArray(
      builder,
      form,
      form,
      {
        id: 'id',
        key: 'key',
        index: 1,
        template: {
          label: 'label',
        },
        children: [],
      } as DynamicFormArrayDefinition,
      {} as DynamicFormFieldType,
    );
    component.field = formArray;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.id).toBe('id');
    expect(component.key).toBe('key');
    expect(component.index).toBe(1);
    expect(component.path).toBe('key');
    expect(component.control).toBeTruthy();
    expect(component.children).toEqual([]);
    expect(component.template).toBeTruthy();
  });

  it('renders component template', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-array-label'));
    const formArrayElement = formArrayDebugElement.nativeElement as HTMLElement;
    const formArrayLabelElement = formArrayLabelDebugElement.nativeElement as HTMLElement;

    expect(formArrayElement).toBeTruthy();
    expect(formArrayLabelElement).toBeTruthy();
  });

  it('hides dynamic form array label if not defined', () => {
    component.template.label = null;
    fixture.detectChanges();

    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-array-label'));

    expect(formArrayLabelDebugElement).toBeNull();
  });

  it('hides dynamic form array label if set hidden', () => {
    component.template.labelHidden = true;
    fixture.detectChanges();

    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-array-label'));

    expect(formArrayLabelDebugElement).toBeNull();
  });

  it('sets class name for dynamic form array label', () => {
    component.template.classNameLabel = 'class-name-label';
    fixture.detectChanges();

    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-array-label.class-name-label'));

    expect(formArrayLabelDebugElement).toBeTruthy();
  });

  it('sets dynamic form array to hidden', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayElement = formArrayDebugElement.nativeElement as HTMLElement;

    expect(formArrayElement.hidden).toBeFalse();

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formArrayElement.hidden).toBeTrue();
  });

  it('sets dynamic form array to readonly', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayElement = formArrayDebugElement.nativeElement as HTMLElement;

    expect(formArrayElement.className).toBe('dynamic-form-array');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-array readonly');
  });

  it('sets class name of dynamic form array', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-array'));
    const formArrayElement = formArrayDebugElement.nativeElement as HTMLElement;

    expect(formArrayElement.className).toBe('dynamic-form-array');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-array className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-array');
  });
});
