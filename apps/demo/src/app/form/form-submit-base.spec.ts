import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockProvider } from 'ng-mocks';
import { FormSubmitBase } from './form-submit-base';
import { FormSubmitDialogComponent } from './form-submit-dialog.component';

@Component({
  selector: 'app-test-form-submit',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestFormSubmitComponent extends FormSubmitBase {}

describe('FormSubmitBase', () => {
  let fixture: ComponentFixture<TestFormSubmitComponent>;
  let formSubmit: TestFormSubmitComponent;
  let matDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(MatDialog)],
    });

    matDialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(TestFormSubmitComponent);
    formSubmit = fixture.componentInstance;
  });

  it('opens dialog on form submit', () => {
    spyOn(matDialog, 'open');

    const data = { value: {}, model: {} };

    formSubmit.onFormSubmit(data);

    expect(matDialog.open).toHaveBeenCalledWith(FormSubmitDialogComponent, { data });
  });
});
