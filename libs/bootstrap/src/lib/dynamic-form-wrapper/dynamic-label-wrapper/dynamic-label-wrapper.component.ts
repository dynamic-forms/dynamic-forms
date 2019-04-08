import { AfterViewInit, Component, ViewContainerRef } from '@angular/core';
import { DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-label-wrapper',
  templateUrl: './dynamic-label-wrapper.component.html',
  styleUrls: ['./dynamic-label-wrapper.component.scss']
})
export class DynamicLabelWrapperBootstrapComponent extends DynamicFormWrapper implements AfterViewInit {
  constructor(protected containerRef: ViewContainerRef) {
    super(containerRef);
  }
}
