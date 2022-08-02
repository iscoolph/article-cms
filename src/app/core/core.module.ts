import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatIconModule, MatMenuModule, MatTreeModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import { UserIndicatorComponent } from './user-indicator/user-indicator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserIndicatorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    MatTreeModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  exports: [
    UserIndicatorComponent
  ]
})
export class CoreModule { }
