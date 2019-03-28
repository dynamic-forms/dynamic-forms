import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';
import { DynamicFormValidationComponent } from '../dynamic-form-validation/dynamic-form-validation.component';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

describe('DynamicFormGroupComponent', () => {
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
        }
      ]
    }).compileComponents();
  }));

  it('creates component', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const field = new DynamicFormGroup(root, root, <DynamicFormGroupTemplate>{
      key: 'key',
      fields: []
    });

    const fixture = TestBed.createComponent(DynamicFormGroupComponent);
    const component = fixture.componentInstance;
    component.field = field;

    fixture.detectChanges();

    expect(component.id).toBe('key');
    expect(component.template).toBeDefined();
    expect(component.control).toBeDefined();
    expect(component.fields).toEqual([]);
  });
});
