import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './interfaces/article.interface';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<Article>;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
