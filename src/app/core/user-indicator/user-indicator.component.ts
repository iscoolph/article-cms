import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { take, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ArticleFormComponent } from 'src/app/shared/article-form/article-form.component';

@Component({
  selector: 'app-user-indicator',
  templateUrl: './user-indicator.component.html',
  styleUrls: ['./user-indicator.component.scss']
})
export class UserIndicatorComponent implements OnInit {

  @Input()
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/']);
  }

}
