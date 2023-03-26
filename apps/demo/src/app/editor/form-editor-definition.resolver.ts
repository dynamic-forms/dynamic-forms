import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { FormDefinitionLoader } from '../examples/form-definition.loader';

@Injectable()
export class FormEditorDefinitionResolver {
  constructor(private formDefinitionLoader: FormDefinitionLoader) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<DynamicFormDefinition>{
    return this.formDefinitionLoader.load(`./assets/editor/default.json`);
  }
}
