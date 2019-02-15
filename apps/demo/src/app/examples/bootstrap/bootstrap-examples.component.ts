import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormTemplate } from '@dynamic-forms/core';

@Component({
  selector: 'app-bootstrap-examples',
  templateUrl: './bootstrap-examples.component.html'
})
export class BootstrapExamplesComponent implements OnInit {
  template: FormTemplate;
  model: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.template = this.route.snapshot.data.template;
    this.model = {};
  }
}
