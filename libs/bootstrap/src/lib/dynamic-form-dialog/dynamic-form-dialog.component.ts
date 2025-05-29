import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DynamicFormAction, DynamicFormElement, DynamicFormElementsComponent } from '@dynamic-forms/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-dynamic-form-dialog',
  imports: [AsyncPipe, NgClass, NgStyle, DynamicFormElementsComponent],
  templateUrl: './dynamic-form-dialog.component.html',
})
export class BsDynamicFormDialogComponent {
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
}
