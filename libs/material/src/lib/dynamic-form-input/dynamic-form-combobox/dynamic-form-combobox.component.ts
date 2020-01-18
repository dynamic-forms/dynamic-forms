import { Component, OnInit } from '@angular/core';
import { DynamicFormCombobox, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'mat-dynamic-form-combobox',
  templateUrl: './dynamic-form-combobox.component.html'
})
export class MatDynamicFormComboboxComponent extends DynamicFormInputBase<DynamicFormCombobox> implements OnInit {
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

  private getFilteredOptions(value: string) {
    const options = this.input.options || [];
    const valueNormalized = value ? value.toUpperCase() : null;
    return valueNormalized
      ? options.filter(option => option.toUpperCase().includes(valueNormalized))
      : options;
  }
}
