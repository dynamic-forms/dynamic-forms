import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryComponent } from './dynamic-form-dictionary.component';
import { DynamicFormDictionaryModule } from './dynamic-form-dictionary.module';

describe('DynamicFormDictionaryComponent', () => {
  let fixture: ComponentFixture<DynamicFormDictionaryComponent>;
  let component: DynamicFormDictionaryComponent;
  let form: DynamicForm;
  let formDictionary: DynamicFormDictionary;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDictionaryModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormConfigService,
        {
          provide: DynamicFormBuilder,
          useValue: {}
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormDictionaryComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    formDictionary = new DynamicFormDictionary(form, form, <DynamicFormDictionaryDefinition>{
      id: 'id',
      key: 'key',
      index: 1,
      template: {
        label: 'label'
      },
      elements: []
    });
    component.field = formDictionary;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.id).toBe('id');
    expect(component.key).toBe('key');
    expect(component.index).toBe(1);
    expect(component.path).toBe('key');
    expect(component.control).toBeTruthy();
    expect(component.elements).toEqual([]);
    expect(component.template).toBeTruthy();
  });

  it('renders component template', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayLabelDebugElement = formArrayDebugElement.query(By.css('div.dynamic-form-dictionary-label'));
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;
    const formArrayLabelElement = <HTMLElement>formArrayLabelDebugElement.nativeElement;

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
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;

    expect(formArrayElement.className).toBe('dynamic-form-dictionary');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-dictionary hidden');
  });

  it('sets dynamic form dictionary to readonly', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;

    expect(formArrayElement.className).toBe('dynamic-form-dictionary');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-dictionary readonly');
  });

  it('sets class name of dynamic form dictionary', () => {
    const formArrayDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-dictionary'));
    const formArrayElement = <HTMLElement>formArrayDebugElement.nativeElement;

    expect(formArrayElement.className).toBe('dynamic-form-dictionary');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-dictionary className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formArrayElement.className).toBe('dynamic-form-dictionary');
  });
});
