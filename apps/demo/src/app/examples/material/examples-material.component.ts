import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExampleData } from '../example.model';

@Component({
  selector: 'app-examples-material',
  templateUrl: './examples-material.component.html',
  styleUrls: ['./examples-material.component.scss']
})
export class ExamplesMaterialComponent {
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
