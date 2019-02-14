import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormTemplate } from '@dynamic-forms/core/form/form-template';
import { Observable } from 'rxjs';

@Injectable()
export class ExampleResolver implements Resolve<Observable<FormTemplate>> {
  constructor(private httpClient: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const templateId = route.params.templateId;
    return this.httpClient.get<FormTemplate>(`./assets/form-template.${ templateId }.json`);
  }
}
