import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { ArticleFormComponent } from './article-form/article-form.component';
import { MatFormModule } from '../modules/mat-form.module';
import { MatTreeModule, MatProgressSpinnerModule, MatGridListModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';


@NgModule({
  declarations: [
    ArticleFormComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatFormModule,
    MatTreeModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    ArticleFormComponent,
    MatTreeModule,
    MatGridListModule
  ],
  entryComponents: [
    ArticleFormComponent
  ]
})
export class SharedModule { }
