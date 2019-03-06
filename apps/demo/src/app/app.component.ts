import { Component } from '@angular/core';
import { RoutingHandler } from './state/routing/routing.handler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private routingHandler: RoutingHandler) {}
}
