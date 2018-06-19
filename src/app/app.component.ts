import { Component } from '@angular/core';
import { AuthenticationService } from './core/authentication.service';

@Component({
  selector: 'kpd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthenticationService) {}

  login(): void {
    this.authService.login();
  }
}
