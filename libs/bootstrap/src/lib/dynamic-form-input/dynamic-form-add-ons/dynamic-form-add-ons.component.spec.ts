import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService, DynamicFormInputBase, DynamicFormLibraryService,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormAddOnsComponent } from './dynamic-form-add-ons.component';
import { BsDynamicFormAddOnsModule } from './dynamic-form-add-ons.module';

@Component({
  selector: 'bs-dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`,
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  imports: [
    BsDynamicFormAddOnsModule,
  ],
  declarations: [
    DynamicFormInputTestComponent,
  ],
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' }),
    },
    DynamicFormConfigService,
    DynamicFormValidationService,
  ],
})
class BsDynamicFormControlLabelTestModule {}

describe('BsDynamicFormAddOnsComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormAddOnsComponent>;
  let component: BsDynamicFormAddOnsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlLabelTestModule,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormAddOnsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
