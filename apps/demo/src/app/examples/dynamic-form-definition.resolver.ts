import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Observable } from 'rxjs';

@Injectable()
export class DynamicFormDefinitionResolver implements Resolve<Observable<DynamicFormDefinition>> {
  constructor(private httpClient: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const definitionId = route.params.definitionId;
    return this.httpClient.get<DynamicFormDefinition>(`./assets/examples/${ definitionId }.json`);
  }
}
