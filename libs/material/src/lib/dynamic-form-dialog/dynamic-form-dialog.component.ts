import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Output,
  SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DynamicFormAction, DynamicFormElement, DYNAMIC_FORM_THEME } from '@dynamic-forms/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mat-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html'
})
export class MatDynamicFormDialogComponent implements OnInit, OnChanges, OnDestroy {
  private _dialog: { reference: MatDialogRef<any>, subscription: Subscription };
  private _dialogOpenSubscription: Subscription;

  @ViewChild('dialogTemplateRef', { static: true })
  dialogTemplateRef: TemplateRef<any>;

  @Input() isOpen$: Observable<boolean>;

  @Input() children: DynamicFormElement[];
  @Input() headerActions: DynamicFormAction[];
  @Input() footerActions: DynamicFormAction[];

  @Input() width: string;
  @Input() height: string;
  @Input() minWidth: string;
  @Input() minHeight: string;
  @Input() maxWidth: string;
  @Input() maxHeight: string;
  @Input() maximized: boolean;

  @Input() title: string;
  @Input() titleHtml: string;

  @Input() classNameForm: string;
  @Input() classNameModal: string;
  @Input() classNameChildren: string;
  @Input() classNameHeader: string;
  @Input() classNameFooter: string;

  @Input() classNameTitle: string;

  // tslint:disable-next-line: typedef
  @Output() escaped = new EventEmitter();

  constructor(private dialog: MatDialog, @Optional() @Inject(DYNAMIC_FORM_THEME) public theme: string) {}

  ngOnInit(): void {
    this._dialogOpenSubscription = this.isOpen$.subscribe(isOpen => {
      return isOpen ? this.openDialog() : this.closeDialog();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.maximized && this._dialog) {
      const width = this.maximized ? this.maxWidth || '100%' : this.width;
      const height = this.maximized ?  this.maxHeight || '100%' : this.height;
      this._dialog.reference.updateSize(width, height);
    }
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
    Object.defineProperty(config, 'height', { get: () => this.height });
    Object.defineProperty(config, 'minWidth', { get: () => this.minWidth });
    Object.defineProperty(config, 'minHeight', { get: () => this.minHeight });
    Object.defineProperty(config, 'maxWidth', { get: () => this.maxWidth });
    Object.defineProperty(config, 'maxHeight', { get: () => this.maxHeight });
    return config;
  }
}
