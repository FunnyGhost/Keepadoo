import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'kpd-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<User>;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.currentUser$ = this.userService.userProfile$;
  }
}
