import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  onLogin(form: NgForm) {
    this.authService.login(
      form.value.username,
      form.value.password
    ).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
  }

}
