import { Component, Inject, OnDestroy, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormActionService, DynamicFormDialogBase, DYNAMIC_FORM_THEME } from '@dynamic-forms/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mat-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html'
})
export class MatDynamicFormDialogComponent extends DynamicFormDialogBase implements OnInit, OnDestroy {
  private _dialog: { reference: MatDialogRef<any>, subscription: Subscription };
  private _isOpenSubscription: Subscription;

  @ViewChild('dialogTemplate', { static: true })
  dialogTemplate: TemplateRef<any>;

  constructor(
    protected actionService: DynamicFormActionService,
    private dialog: MatDialog,
    @Optional() @Inject(DYNAMIC_FORM_THEME)
    public theme: string) {
    super(actionService);
  }

  ngOnInit(): void {
    this._isOpenSubscription = this.isOpen$.subscribe(isOpen => {
      return isOpen ? this.openDialog() : this.closeDialog();
    });
  }

  ngOnDestroy(): void {
    this._isOpenSubscription.unsubscribe();
    this.closeDialog();
  }

  private openDialog(): void {
    this.closeDialog();
    const config = this.getDialogConfig();
    const reference = this.dialog.open(this.dialogTemplate, config);
    const subscription = reference.beforeClosed().subscribe(_ => {
      this.element.close();
    });
    this._dialog = { reference, subscription };
  }

  private closeDialog(): void {
    if (this._dialog) {
      this._dialog.reference.close();
      this._dialog.subscription.unsubscribe();
      this._dialog = null;
    }
  }

  private getDialogConfig(): MatDialogConfig {
    const config = new MatDialogConfig();
    if (this.template) {
      Object.defineProperty(config, 'width', { get: () => this.template.width });
      Object.defineProperty(config, 'minWidth', { get: () => this.template.minWidth });
      Object.defineProperty(config, 'maxWidth', { get: () => this.template.maxWidth });
    }
    return config;
  }
}
