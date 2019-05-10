import { Component, OnInit } from '@angular/core';
import { DynamicFormCombobox, DynamicFormValidationService } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDynamicFormInputComponent } from '../mat-dynamic-form-input.component';

@Component({
  selector: 'mat-dynamic-form-combobox',
  templateUrl: './dynamic-form-combobox.component.html'
})
export class DynamicFormComboboxComponent extends MatDynamicFormInputComponent<DynamicFormCombobox> implements OnInit {
  filteredOptions: Observable<string[]>;

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.getFilteredOptions(value))
    );
  }

  private getFilteredOptions(value) {
    const options = this.input.options || [];
    return value ? options.filter(option => option.startsWith(value)) : options;
  }
}
