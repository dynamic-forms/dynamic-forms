import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { Example } from '../state/examples/examples.model';
import { FormDefinitionLoader } from './form-definition.loader';

@Injectable()
export class FormExampleDefinitionResolver implements Resolve<Observable<DynamicFormDefinition>> {
  constructor(private formDefinitionLoader: FormDefinitionLoader) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<DynamicFormDefinition> {
    const example = route.parent.data.example as Example;
    const file = example.path ? `${ example.path}/${ example.id }.json` : `${ example.id }.json`;
    return this.formDefinitionLoader.load(`./assets/examples/${ file }`);
  }
}
