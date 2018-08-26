import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [CommonModule, UserRoutingModule],
  declarations: [ProfileComponent, RegisterComponent]
})
export class UserModule {}
