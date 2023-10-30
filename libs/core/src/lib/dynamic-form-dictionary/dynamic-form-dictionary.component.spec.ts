import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryComponent } from './dynamic-form-dictionary.component';
import { DynamicFormDictionaryModule } from './dynamic-form-dictionary.module';

describe('DynamicFormDictionaryComponent', () => {
  let fixture: ComponentFixture<DynamicFormDictionaryComponent>;
  let component: DynamicFormDictionaryComponent;
  let form: DynamicForm;
  let formDictionary: DynamicFormDictionary;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = {} as any;

    TestBed.configureTestingModule({
      imports: [
        DynamicFormDictionaryModule,
      ],
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

    fixture = TestBed.createComponent(DynamicFormDictionaryComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    formDictionary = new DynamicFormDictionary(builder, form, form, {
      id: 'id',
      key: 'key',
      index: 1,
      template: {
        label: 'label',
      },
      children: [],
    } as DynamicFormDictionaryDefinition, {} as DynamicFormFieldType);
    component.field = formDictionary;

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
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-dictionary-label'));
    const formArrayElement = formArrayDebugElement.nativeElement as HTMLElement;
    const formArrayLabelElement = formArrayLabelDebugElement.nativeElement as HTMLElement;

    expect(formArrayElement).toBeTruthy();
    expect(formArrayLabelElement).toBeTruthy();
  });

  it('hides dynamic form dictionary label if not defined', () => {
    component.template.label = null;
    fixture.detectChanges();

    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-dictionary-label'));

    expect(formArrayLabelDebugElement).toBeNull();
  });

  it('hides dynamic form dictionary label if set hidden', () => {
    component.template.labelHidden = true;
    fixture.detectChanges();

    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-dictionary-label'));

    expect(formArrayLabelDebugElement).toBeNull();
  });

  it('sets class name for dynamic form dictionary label', () => {
    component.template.classNameLabel = 'class-name-label';
    fixture.detectChanges();

    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-dictionary-label.class-name-label'));

    expect(formArrayLabelDebugElement).toBeTruthy();
  });

  it('sets dynamic form dictionary to hidden', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayElement = formArrayDebugElement.nativeElement as HTMLElement;

    expect(formArrayElement.hidden).toBeFalse();

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formArrayElement.hidden).toBeTrue();
  });

  it('sets dynamic form dictionary to readonly', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayElement = formArrayDebugElement.nativeElement as HTMLElement;

    expect(formArrayElement.className).toBe('dynamic-form-dictionary');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-dictionary readonly');
  });

  it('sets class name of dynamic form dictionary', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayElement = formArrayDebugElement.nativeElement as HTMLElement;

    expect(formArrayElement.className).toBe('dynamic-form-dictionary');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-dictionary className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-dictionary');
  });
});
