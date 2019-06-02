import { async, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService, DynamicFormValidationService} from '@dynamic-forms/core';
import { MatDynamicFormValidationComponent } from './dynamic-form-validation.component';
import { MatDynamicFormValidationModule } from './dynamic-form-validation.module';

describe('MatDynamicFormValidationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormValidationModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({
            module: 'material'
          })
        },
        DynamicFormValidationService
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(MatDynamicFormValidationComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
