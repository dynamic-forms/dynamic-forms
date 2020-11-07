import { Component, Inject, Input, Optional } from '@angular/core';
import { DynamicFormAction, DynamicFormElement, DYNAMIC_FORM_THEME } from '@dynamic-forms/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html'
})
export class BsDynamicFormDialogComponent {
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

  constructor(@Optional() @Inject(DYNAMIC_FORM_THEME) public theme: string) {}
}
