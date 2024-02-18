import { DatePipe, NgIf } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DynamicFormLog } from '@dynamic-forms/core';
import { FormEditorLogDataPipe } from './form-editor-log-data.pipe';
import { FormEditorLogLevelPipe } from './form-editor-log-level.pipe';

@Component({
  standalone: true,
  selector: 'app-form-editor-logs',
  templateUrl: './form-editor-logs.component.html',
  styleUrls: ['./form-editor-logs.component.scss'],
  imports: [
    DatePipe,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormEditorLogDataPipe,
    FormEditorLogLevelPipe,
  ],
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
