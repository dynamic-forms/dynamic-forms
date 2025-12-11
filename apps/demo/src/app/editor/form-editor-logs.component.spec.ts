import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormLog } from '@dynamic-forms/core';
import { FormEditorLogsComponent } from './form-editor-logs.component';

describe('FormEditorLogsComponent', () => {
  let fixture: ComponentFixture<FormEditorLogsComponent>;
  let component: FormEditorLogsComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditorLogsComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('has logs input', () => {
    const logs = [] as DynamicFormLog[];

    fixture.componentRef.setInput('logs', logs);
    fixture.detectChanges();

    expect(component.dataSource.data).toBe(logs);
  });
});
