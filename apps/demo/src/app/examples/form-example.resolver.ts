import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ExampleMenu } from '../state/examples/examples.model';
import { ExamplesState } from '../state/examples/examples.state';

@Injectable()
export class FormExampleResolver implements Resolve<Observable<ExampleMenu>> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<ExampleMenu> {
    return this.store.select(ExamplesState.example(route.params.definitionId)).pipe(take(1));
  }
}
