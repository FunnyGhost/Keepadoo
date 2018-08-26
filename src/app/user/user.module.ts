import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule],
  declarations: [ProfileComponent, RegisterComponent, LoginComponent]
})
export class UserModule {}
