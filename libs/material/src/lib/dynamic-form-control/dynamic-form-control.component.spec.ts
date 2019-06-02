import { async, TestBed } from '@angular/core/testing';
import { DynamicFormComponentFactory, DynamicFormConfigService} from '@dynamic-forms/core';
import { MatDynamicFormControlComponent } from './dynamic-form-control.component';
import { MatDynamicFormControlModule } from './dynamic-form-control.module';

describe('MatDynamicFormControlComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormControlModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({
            module: 'material'
          })
        },
        DynamicFormComponentFactory
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(MatDynamicFormControlComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
