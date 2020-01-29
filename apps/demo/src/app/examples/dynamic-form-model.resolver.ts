import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class DynamicFormModelResolver implements Resolve<Observable<any>> {
  constructor(private httpClient: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const modelId = route.params.modelId;
    return this.httpClient.get(`./assets/examples/models/${ modelId }.json`);
  }
}
