import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, switchMap, take, map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<User>(null);
  user$ = this._user.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.retrieveUser();
  }

  login(email: string, username: string) {
    const url = `${environment.restAPI}/users`;
    return this.http.post<User>(url, {
      email,
      username
    }).pipe(
      tap((user) => {
        this._user.next(user);
        window.localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout() {
    window.localStorage.removeItem('user');
    this._user.next(null);
  }

  private retrieveUser() {
    const userData = window.localStorage.getItem('user');
    let user = null;

    if (userData) {
      user = JSON.parse(userData);
      this._user.next(user);
      return true;
    }

    return false;
  }

}
