import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormTemplate } from '@dynamic-forms/core';

@Component({
  selector: 'app-material-examples',
  templateUrl: './material-examples.component.html',
  styleUrls: ['./material-examples.component.scss']
})
export class MaterialExamplesComponent implements OnInit {
  template: DynamicFormTemplate;
  model: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.template = this.route.snapshot.data.template;
    this.model = {};
  }
}
