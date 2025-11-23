import { MatDialog } from '@angular/material/dialog';
import { MockService } from 'ng-mocks';
import { FormSubmitBase } from './form-submit-base';
import { FormSubmitDialogComponent } from './form-submit-dialog.component';

class TestFormSubmit extends FormSubmitBase {
  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }
}

describe('FormSubmitBase', () => {
  let matDialog: MatDialog;
  let formSubmit: TestFormSubmit;

  beforeEach(() => {
    matDialog = MockService(MatDialog);
    formSubmit = new TestFormSubmit(matDialog);
  });

  it('opens dialog on form submit', () => {
    spyOn(matDialog, 'open');

    const data = { value: {}, model: {} };

    formSubmit.onFormSubmit(data);

    expect(matDialog.open).toHaveBeenCalledWith(FormSubmitDialogComponent, { data });
  });
});
