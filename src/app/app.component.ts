import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './core/authentication.service';

@Component({
  selector: 'kpd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.authService.handleAuthentication();
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
