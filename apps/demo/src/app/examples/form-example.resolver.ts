import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ExampleMenu } from '../state/examples/examples.model';
import { ExamplesState } from '../state/examples/examples.state';

@Injectable()
export class FormExampleResolver {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<ExampleMenu> {
    const definitionId = route.params.definitionId;
    return definitionId !== 'errors'
      ? this.store.select(ExamplesState.example(definitionId)).pipe(take(1))
      : of({ id: 'errors', path: 'errors', label: 'Errors' });
  }
}
