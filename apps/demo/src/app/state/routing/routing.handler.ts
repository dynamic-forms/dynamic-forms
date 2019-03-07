import { Injectable } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProgressItemPop, ProgressItemPush } from './../progress/progress.actions';

@Injectable()
export class RoutingHandler {
  constructor(private store: Store, private router: Router) {
    this.router.events.subscribe(event => this.handle(event));
  }

  private handle(event: Event) {
    if (event instanceof NavigationStart) {
      this.store.dispatch(new ProgressItemPush({ id: event.id }));
    } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
      this.store.dispatch([
        new ProgressItemPop({ id: event.id })
      ]);
    } else if (event instanceof NavigationEnd) {
      this.store.dispatch([
        new ProgressItemPop({ id: event.id })
      ]);
    }
  }
}
