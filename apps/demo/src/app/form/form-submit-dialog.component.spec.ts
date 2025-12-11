import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockProvider } from 'ng-mocks';
import { FormSubmitDialogComponent } from './form-submit-dialog.component';

describe('FormSubmitDialogComponent', () => {
  let fixture: ComponentFixture<FormSubmitDialogComponent>;
  let component: FormSubmitDialogComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(MatDialogRef), MockProvider(MAT_DIALOG_DATA, {})],
    });

    fixture = TestBed.createComponent(FormSubmitDialogComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
