import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationModel } from '../../authentication.model';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'kpd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value as AuthenticationModel).then(
      res => {
        this.errorMessage = '';
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
}
