import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialFormComponent } from './material-form.component';

describe('MaterialFormComponent', () => {
  let fixture: ComponentFixture<MaterialFormComponent>;
  let component: MaterialFormComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialFormComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('has form, definition, model and value ', () => {
    fixture.componentRef.setInput('data', { definition: { children: [] }, model: {} });
    fixture.detectChanges();
    fixture.detectChanges();

    expect(component.form()).toBeTruthy();
    expect(component.formDefinition).toBeTruthy();
    expect(component.formModel).toBeTruthy();
    expect(component.formValue).toBeTruthy();
  });
});
