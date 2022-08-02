import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from './interfaces/article.interface';
import { tap, catchError, take, switchMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const articleData = window.localStorage.getItem('article');
    let _request = req.clone();
    if (articleData) {
      const article: Article = JSON.parse(articleData);
    }
    return next.handle(_request).pipe(
      catchError(event => {
        if (event instanceof HttpErrorResponse) {
          throw event;
        }
        return of(null);
      })
    );
  }

}
