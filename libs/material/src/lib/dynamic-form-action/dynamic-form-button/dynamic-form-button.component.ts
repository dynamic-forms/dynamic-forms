import { Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Component, Optional } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DynamicFormActionService, DynamicFormButtonBase, DYNAMIC_FORM_THEME } from '@dynamic-forms/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mat-dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html'
})
export class MatDynamicFormButtonComponent extends DynamicFormButtonBase implements OnInit, OnDestroy {
  private _dialogRef: { reference: MatDialogRef<any>, subscription: Subscription };
  private _dialogOpenSubscription: Subscription;

  @ViewChild('dialogTemplateRef', { static: true })
  dialogTemplateRef: TemplateRef<any>;

  constructor(
    protected actionService: DynamicFormActionService,
    protected dialogService: MatDialog,
    @Optional() @Inject(DYNAMIC_FORM_THEME)
    public theme: string
  ) {
    super(actionService);
  }

  ngOnInit(): void {
    this._dialogOpenSubscription = this.dialogOpen$.subscribe(isOpen => {
      return isOpen ? this.openDialogRef() : this.closeDialogRef();
    });
  }

  ngOnDestroy(): void {
    this._dialogOpenSubscription.unsubscribe();
    this.closeDialog();
  }

  private openDialogRef(): void {
    this.closeDialogRef();
    const config = this.getDialogConfig();
    const reference = this.dialogService.open(this.dialogTemplateRef, config);
    const subscription = reference.beforeClosed().subscribe(_ => {
      this.action.closeDialog();
    });
    this._dialogRef = { reference, subscription };
  }

  private closeDialogRef(): void {
    if (this._dialogRef) {
      this._dialogRef.reference.close();
      this._dialogRef.subscription.unsubscribe();
      this._dialogRef = null;
    }
  }

  private getDialogConfig(): MatDialogConfig {
    const config = new MatDialogConfig();
    if (this.template) {
      Object.defineProperty(config, 'width', { get: () => this.template.dialogWidth });
      Object.defineProperty(config, 'minWidth', { get: () => this.template.dialogMinWidth });
      Object.defineProperty(config, 'maxWidth', { get: () => this.template.dialogMaxWidth });
    }
    return config;
  }
}
