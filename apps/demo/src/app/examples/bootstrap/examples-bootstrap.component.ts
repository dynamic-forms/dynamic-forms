import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExampleData } from '../example.model';

@Component({
  selector: 'app-examples-bootstrap',
  templateUrl: './examples-bootstrap.component.html',
  styleUrls: ['./examples-bootstrap.component.scss']
})
export class ExamplesBootstrapComponent {
  data$: Observable<ExampleData>;

  constructor(private route: ActivatedRoute) {
    this.data$ = this.route.data.pipe(
      map(data => this.mapData(data))
    );
  }

  private mapData(data: Data): ExampleData {
    return {
      template: data.template,
      model: {}
    };
  }
}
