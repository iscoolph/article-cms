import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article } from './interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  createArticle(article: Article) {
    const url = `${environment.restAPI}/posts`;
    return this.http.post(url, article).pipe(catchError(this.errorHandler));
  }

  updateArticle(article: Article) {
    const url = `${environment.restAPI}/posts/${article.id}`;
    return this.http.put(url, article).pipe(catchError(this.errorHandler));
  }

  private errorHandler(event) {
    let message = `Error saving article, please try again❗️❗️`;
    if (event instanceof HttpErrorResponse) {
      if (event.status == 400) {
        message = event.error.message;
        throw message;
      }
    }
    return of(null);
  }
}
