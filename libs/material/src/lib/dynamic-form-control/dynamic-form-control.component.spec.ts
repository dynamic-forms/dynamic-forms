import { async, TestBed } from '@angular/core/testing';
import { DynamicFormComponentFactory, DynamicFormConfigService} from '@dynamic-forms/core';
import { DynamicFormControlMaterialComponent } from './dynamic-form-control.component';
import { DynamicFormControlMaterialModule } from './dynamic-form-control.module';

describe('DynamicFormControlMAterialComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormControlMaterialModule
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
    const fixture = TestBed.createComponent(DynamicFormControlMaterialComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
