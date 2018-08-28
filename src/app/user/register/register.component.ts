import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationModel } from '../../authentication.model';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'kpd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: passwordMatch()
      }
    );
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value as AuthenticationModel).then(
      res => {
        this.errorMessage = '';
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
}

function passwordMatch() {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl.value === confirmPasswordControl.value
    ) {
      return null;
    } else {
      return {
        passwordMatch: true
      };
    }
  };
}
