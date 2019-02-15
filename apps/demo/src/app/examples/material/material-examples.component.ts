import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormTemplate } from '@dynamic-forms/core/lib/form/form-template';

@Component({
  selector: 'app-material-examples',
  templateUrl: './material-examples.component.html'
})
export class MaterialExamplesComponent implements OnInit {
  template: FormTemplate;
  model: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.template = this.route.snapshot.data.template;
    this.model = {};
  }
}
