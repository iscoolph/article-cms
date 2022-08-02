import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './articles.component';
import { DatatableModule } from '../components/datatable/datatable.module';
import { MatButtonModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent
  }
];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    DatatableModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ]
})
export class ArticleModule {}
