import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material';
import { MatFormModule } from '../modules/mat-form.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  }
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MatFormModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
