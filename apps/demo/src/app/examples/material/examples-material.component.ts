import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormTemplate } from '@dynamic-forms/core';

@Component({
  selector: 'app-examples-material',
  templateUrl: './examples-material.component.html',
  styleUrls: ['./examples-material.component.scss']
})
export class ExamplesMaterialComponent implements OnInit {
  template: DynamicFormTemplate;
  model: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.template = this.route.snapshot.data.template;
    this.model = {};
  }
}
