import { Component, OnInit } from '@angular/core';
import { DynamicFormCombobox, DynamicFormInputComponent } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mat-dynamic-form-combobox',
  templateUrl: './dynamic-form-combobox.component.html'
})
export class DynamicFormComboboxComponent extends DynamicFormInputComponent<DynamicFormCombobox> implements OnInit {
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      map(value => this.input.options.filter(option => option.startsWith(value)))
    );
  }
}
