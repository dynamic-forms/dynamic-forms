import { async, TestBed } from '@angular/core/testing';
import { DynamicFormLabelWrapperBootstrapComponent } from './dynamic-form-label-wrapper.component';
import { BsDynamicFormWrapperModule } from './dynamic-form-wrapper.module';

describe('DynamicFormLabelWrapperBootstrapComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormWrapperModule
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicFormLabelWrapperBootstrapComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
