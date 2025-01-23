import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DYNAMIC_FORM_THEME, DynamicFormAction, DynamicFormElement, DynamicFormElementsComponent } from '@dynamic-forms/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mat-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html',
  imports: [NgClass, MatDialogModule, DynamicFormElementsComponent],
})
export class MatDynamicFormDialogComponent implements OnInit, OnChanges, OnDestroy {
  private _dialog: { config: MatDialogConfig; reference: MatDialogRef<any>; subscription: Subscription };
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

  @Output() readonly escaped = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    @Optional() @Inject(DYNAMIC_FORM_THEME) public theme: string,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this._dialog && changes.maximized) {
      const width = this.getDialogWidth();
      const height = this.getDialogHeight();
      this._dialog.reference.updateSize(width, height);
    }
  }

  ngOnInit(): void {
    this._dialogOpenSubscription = this.isOpen$.subscribe(isOpen => (isOpen ? this.openDialog() : this.closeDialog()));
  }

  ngOnDestroy(): void {
    this._dialogOpenSubscription.unsubscribe();
    this.closeDialog();
  }

  private openDialog(): void {
    this.closeDialog();
    const config = this.getDialogConfig();
    const reference = this.dialog.open(this.dialogTemplateRef, config);
    const subscription = reference.beforeClosed().subscribe(_ => this.escaped.emit());
    this._dialog = { config, reference, subscription };
  }

  private closeDialog(): void {
    if (this._dialog) {
      this._dialog.reference.close();
      this._dialog.subscription.unsubscribe();
      this._dialog = null;
    }
  }

  private getDialogWidth(): string {
    return this.maximized ? this.maxWidth || '100%' : this.width;
  }

  private getDialogHeight(): string {
    return this.maximized ? this.maxHeight || '100%' : this.height;
  }

  private getDialogConfig(): MatDialogConfig {
    const config = new MatDialogConfig();
    config.width = this.getDialogWidth();
    config.height = this.getDialogHeight();
    config.minWidth = this.minWidth;
    config.minHeight = this.minHeight;
    config.maxWidth = this.maxWidth;
    config.maxHeight = this.maxHeight;
    return config;
  }
}
