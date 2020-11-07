import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DynamicFormAction, DynamicFormElement, DYNAMIC_FORM_THEME } from '@dynamic-forms/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mat-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html'
})
export class MatDynamicFormDialogComponent implements OnInit, OnDestroy {
  private _dialog: { reference: MatDialogRef<any>, subscription: Subscription };
  private _dialogOpenSubscription: Subscription;

  @ViewChild('dialogTemplateRef', { static: true })
  dialogTemplateRef: TemplateRef<any>;

  @Input() isOpen$: Observable<boolean>;

  @Input() elements: DynamicFormElement[];
  @Input() headerActions: DynamicFormAction[];
  @Input() footerActions: DynamicFormAction[];

  @Input() width: string;
  @Input() minWidth: string;
  @Input() maxWidth: string;

  @Input() title: string;
  @Input() titleHtml: string;

  @Input() classNameForm: string;
  @Input() classNameModal: string;
  @Input() classNameTitle: string;
  @Input() classNameElements: string;
  @Input() classNameHeader: string;
  @Input() classNameFooter: string;

  // tslint:disable-next-line: typedef
  @Output() escaped = new EventEmitter();

  constructor(private dialog: MatDialog, @Optional() @Inject(DYNAMIC_FORM_THEME) public theme: string) {}

  ngOnInit(): void {
    this._dialogOpenSubscription = this.isOpen$.subscribe(isOpen => {
      return isOpen ? this.openDialog() : this.closeDialog();
    });
  }

  ngOnDestroy(): void {
    this._dialogOpenSubscription.unsubscribe();
    this.closeDialog();
  }

  private openDialog(): void {
    this.closeDialog();
    const config = this.getDialogConfig();
    const reference = this.dialog.open(this.dialogTemplateRef, config);
    const subscription = reference.beforeClosed().subscribe(_ => {
      return this.escaped.emit();
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
    Object.defineProperty(config, 'width', { get: () => this.width });
    Object.defineProperty(config, 'minWidth', { get: () => this.minWidth });
    Object.defineProperty(config, 'maxWidth', { get: () => this.maxWidth });
    return config;
  }
}
