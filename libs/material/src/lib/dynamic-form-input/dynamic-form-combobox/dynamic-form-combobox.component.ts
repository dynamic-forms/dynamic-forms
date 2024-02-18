import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormCombobox, DynamicFormElementComponent, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-combobox',
  templateUrl: './dynamic-form-combobox.component.html',
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    DynamicFormElementComponent,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
})
export class MatDynamicFormComboboxComponent extends DynamicFormInputBase<DynamicFormCombobox> implements OnInit {
  filteredOptions: Observable<string[]>;

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.getFilteredOptions(value)),
    );
  }

  private getFilteredOptions(value: string): string[] {
    const valueNormalized = value ? value.toUpperCase() : null;
    return valueNormalized ? this.input.options?.filter(option => option.toUpperCase().includes(valueNormalized)) : this.input.options;
  }
}
