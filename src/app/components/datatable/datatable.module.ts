import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatCheckboxModule,
  MatButtonModule
} from '@angular/material';
import { DatatableComponent } from './datatable.component';

@NgModule({
  declarations: [DatatableComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [DatatableComponent]
})
export class DatatableModule {}
