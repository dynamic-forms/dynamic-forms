import { AfterViewInit, Component, ViewContainerRef } from '@angular/core';
import { DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-label-wrapper',
  templateUrl: './dynamic-form-label-wrapper.component.html',
  styleUrls: ['./dynamic-form-label-wrapper.component.scss']
})
export class DynamicFormLabelWrapperBootstrapComponent extends DynamicFormWrapper implements AfterViewInit {
  constructor(protected containerRef: ViewContainerRef) {
    super(containerRef);
  }
}
