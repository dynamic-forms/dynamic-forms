import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDynamicFormsModule } from '@dynamic-forms/material';
import { v4 } from 'uuid';
import { PreferencesMenuComponent } from './preferences-menu.component';

export const dynamicFormIdBuilder = (): string => v4();

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDynamicFormsModule.forRoot({
      theme: 'material',
      idBuilder: dynamicFormIdBuilder,
    }),
  ],
  declarations: [
    PreferencesMenuComponent,
  ],
  exports: [
    PreferencesMenuComponent,
  ],
})
export class PreferencesMenuModule {}
