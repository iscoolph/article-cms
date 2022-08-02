import { Component, OnInit, Inject, Optional, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Article } from 'src/app/interfaces/article.interface';
import { ArticleService } from 'src/app/article.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { take, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  @Output()
  saveSuccess = new EventEmitter();

  @ViewChild('articleForm', { static: true })
  private articleForm: NgForm;

  @Input()
  userData: Article;

  isEditing = false;
  isLoading = false;

  isCurrentUser = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private article: Article,
    private articleService: ArticleService,
    private dialogRef: MatDialogRef<ArticleFormComponent>,
  ) { }

  ngOnInit() {
    if (this.article) {
      const _article = {
        ...this.article
      };
      setTimeout(() => {
        this.articleForm.setValue({
          ..._article,
          title: this.article.title,
          body: this.article.body
        });
      }, 10);

      this.isEditing = true;
    }
  }

  saveArticle(form: NgForm) {
    let obs$: Observable<any>;

    if (this.isEditing) {
      console.info(form.value);
      obs$ = this.articleService.updateArticle(form.value);
    } else {
      delete form.value.id;
      console.info(form.value);
      obs$ = this.articleService.createArticle(form.value);
    }
    this.isLoading = true;
    obs$
    .pipe(
      finalize(() => {
        this.isLoading = false;
        this.dialogRef.close();
      })
    )
    .subscribe(
      (article) => {
        if (article) {
          this.saveSuccess.emit(true);
        }
      }
    );
  }

}
