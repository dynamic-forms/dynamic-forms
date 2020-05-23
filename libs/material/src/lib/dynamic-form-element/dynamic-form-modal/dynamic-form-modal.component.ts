import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DynamicFormModalBase } from '@dynamic-forms/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mat-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html'
})
export class MatDynamicFormModalComponent extends DynamicFormModalBase implements OnInit, OnDestroy {
  private _dialog: { ref: MatDialogRef<any>, subscription: Subscription };
  private _isOpenSubscription: Subscription;

  @ViewChild('modalTemplate', { static: true })
  modalTemplate: TemplateRef<any>;

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this._isOpenSubscription = this.element.isOpenChange.subscribe(isOpen => {
      return isOpen ? this.openDialog() : this.closeDialog();
    });
  }

  ngOnDestroy(): void {
    this._isOpenSubscription.unsubscribe();
    this.closeDialog();
  }

  private openDialog(): void {
    this.closeDialog();
    const ref = this.dialog.open(this.modalTemplate);
    const subscription = ref.beforeClosed().subscribe(_ => {
      this.element.close();
    });
    this._dialog = { ref, subscription };
  }

  private closeDialog(): void {
    if (this._dialog) {
      this._dialog.ref.close();
      this._dialog.subscription.unsubscribe();
      this._dialog = null;
    }
  }
}
