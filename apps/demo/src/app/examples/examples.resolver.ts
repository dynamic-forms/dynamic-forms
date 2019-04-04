import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DynamicFormTemplate } from '@dynamic-forms/core';
import { Observable } from 'rxjs';

@Injectable()
export class ExamplesResolver implements Resolve<Observable<DynamicFormTemplate>> {
  constructor(private httpClient: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const templateId = route.params.templateId;
    return this.httpClient.get<DynamicFormTemplate>(`./assets/templates/${ templateId }.json`);
  }
}
