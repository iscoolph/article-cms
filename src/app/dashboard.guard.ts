import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {

    return this.authService.user$
      .pipe(
        take(1),
        map((user) => {
          const canActivate = user ? true : false;
          if (!canActivate) {
            this.router.navigate(['/']);
          }
          return canActivate;
        })
      );
  }
}
