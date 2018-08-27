import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../../core/models/user';
import * as userSelectors from '../../state/state';
import { UserState } from '../../state/state';

@Component({
  selector: 'kpd-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<User>;
  constructor(private userStore: Store<UserState>) {}

  ngOnInit() {
    this.currentUser$ = this.userStore.pipe(
      select(userSelectors.getCurrentUser),
      filter(Boolean)
    );
  }
}
