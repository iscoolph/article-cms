import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';
import { DatatableComponent, TableDefinition } from 'src/app/components/datatable/datatable.component';
import { Article } from 'src/app/interfaces/article.interface';
import { ArticleFormComponent } from 'src/app/shared/article-form/article-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  entryComponents: [
    ArticleFormComponent
  ]
})
export class ArticleComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: true })
  table: DatatableComponent;

  articleEndpoint = `${environment.restAPI}/posts`;
  tblDefinition: TableDefinition[] = [
    {
      columnKey: 'userId',
      columnTitle: 'User ID'
    },
    {
      columnKey: 'id',
      columnTitle: 'ID'
    },
    {
      columnKey: 'title',
      columnTitle: 'Title'
    },
    {
      columnKey: 'body',
      columnTitle: 'Body'
    }
  ];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  parseData(articles: Article[]) {
    return articles.map((article) => {
      const _article: any = { ...article };
      return _article;
    });
  }

  showArticleForm(article?: Article) {
    const param = article ? { data: article } : {};
    const ref = this.dialog.open(ArticleFormComponent, param);

    ref.componentInstance.saveSuccess
      .pipe(
        take(1)
      ).subscribe(() => {
        this.table.reloadTable();
      });
  }

}
