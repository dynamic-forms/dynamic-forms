import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormTemplate } from '@dynamic-forms/core';

@Component({
  selector: 'app-bootstrap-examples',
  templateUrl: './bootstrap-examples.component.html',
  styleUrls: ['./bootstrap-examples.component.scss']
})
export class BootstrapExamplesComponent implements OnInit {
  template: DynamicFormTemplate;
  model: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.template = this.route.snapshot.data.template;
    this.model = {};
  }
}
