import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicFormLog } from '@dynamic-forms/core';

@Component({
  selector: 'app-form-editor-logs',
  templateUrl: './form-editor-logs.component.html',
  styleUrls: ['./form-editor-logs.component.scss'],
})
export class FormEditorLogsComponent implements AfterViewInit {
  readonly columns = ['timestamp', 'type', 'level', 'message', 'detailed'];
  readonly dataSource = new MatTableDataSource<DynamicFormLog>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input()
  set logs(logs: DynamicFormLog[]) {
    this.dataSource.data = logs;
  }
  get logs(): DynamicFormLog[] {
    return this.dataSource.data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
