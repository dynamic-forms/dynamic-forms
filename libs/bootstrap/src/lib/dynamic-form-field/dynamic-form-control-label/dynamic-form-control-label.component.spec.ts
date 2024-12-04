import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicFormConfigService,
  DynamicFormInputBase,
  DynamicFormLibraryService,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

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

describe('BsDynamicFormControlLabelComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormControlLabelComponent>;
  let component: BsDynamicFormControlLabelComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormControlLabelTestModule],
    });

    fixture = TestBed.createComponent(BsDynamicFormControlLabelComponent);
    component = fixture.componentInstance;
    component.field = { inputId: 'inputId', template: { label: 'label' } } as any;
    component.component = component.ref.createComponent(DynamicFormInputTestComponent).instance;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders component template', () => {
    const labelDebugElement = fixture.debugElement.query(By.css('label'));
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;

    expect(labelElement).toBeTruthy();
    expect(labelElement.htmlFor).toBe('inputId');
    expect(labelElement.innerText).toBe('label');
  });
});
