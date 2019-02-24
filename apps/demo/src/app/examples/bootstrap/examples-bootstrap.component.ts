import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormTemplate } from '@dynamic-forms/core';

@Component({
  selector: 'app-examples-bootstrap',
  templateUrl: './examples-bootstrap.component.html',
  styleUrls: ['./examples-bootstrap.component.scss']
})
export class ExamplesBootstrapComponent implements OnInit {
  template: DynamicFormTemplate;
  model: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.template = this.route.snapshot.data.template;
    this.model = {};
  }
}
