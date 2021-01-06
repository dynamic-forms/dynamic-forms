import { DynamicFormTabsBase } from './dynamic-form-tabs-base';

class DynamicFormTabsTestComponent extends DynamicFormTabsBase {}

describe('DynamicFormTabsBase', () => {
  let component: DynamicFormTabsTestComponent;

  beforeEach(() => {
    component = new DynamicFormTabsTestComponent();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
