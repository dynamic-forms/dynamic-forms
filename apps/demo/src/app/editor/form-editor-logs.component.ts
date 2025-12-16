import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, effect, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DynamicFormLog } from '@dynamic-forms/core';
import { FormEditorLogDataPipe } from './form-editor-log-data.pipe';
import { FormEditorLogLevelPipe } from './form-editor-log-level.pipe';

@Component({
  selector: 'app-form-editor-logs',
  imports: [DatePipe, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, FormEditorLogDataPipe, FormEditorLogLevelPipe],
  templateUrl: './form-editor-logs.component.html',
  styleUrl: './form-editor-logs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEditorLogsComponent implements AfterViewInit {
  readonly columns = ['timestamp', 'type', 'level', 'message', 'detailed'];
  readonly dataSource = new MatTableDataSource<DynamicFormLog>();
  readonly logs = input<DynamicFormLog[]>(undefined);
  readonly paginator = viewChild(MatPaginator);

  constructor() {
    effect(() => {
      this.dataSource.data = this.logs();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
  }
}
