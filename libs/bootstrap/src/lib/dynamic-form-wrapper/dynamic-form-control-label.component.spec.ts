import { async, TestBed } from '@angular/core/testing';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';
import { BsDynamicFormWrapperModule } from './dynamic-form-wrapper.module';

describe('BsDynamicFormControlLabelComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormWrapperModule
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(BsDynamicFormControlLabelComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
