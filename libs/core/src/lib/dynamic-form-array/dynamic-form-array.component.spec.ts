import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormValidationComponent } from '../dynamic-form-validation/dynamic-form-validation.component';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

describe('DynamicFormArrayComponent', () => {
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
        }
      ]
    }).compileComponents();
  }));

  it('creates component', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const field = new DynamicFormArray(root, root, <DynamicFormArrayTemplate>{
      key: 'key',
      fields: []
    });

    const fixture = TestBed.createComponent(DynamicFormArrayComponent);
    const component = fixture.componentInstance;
    component.field = field;

    fixture.detectChanges();

    expect(component.id).toBe('key');
    expect(component.template).toBeDefined();
    expect(component.control).toBeDefined();
    expect(component.fields).toEqual([]);
  });
});
