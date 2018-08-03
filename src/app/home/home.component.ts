import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
import * as userSelectors from '../state/state';
import { UserState } from '../state/state';
import * as userActions from '../state/user.action';

@Component({
  selector: 'kpd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  discoverableMovies$: Observable<MovieDiscover[]>;

  constructor(private userStore: Store<UserState>) {}

  ngOnInit() {
    this.discoverableMovies$ = this.userStore.pipe(select(userSelectors.getDiscoverMovies));
    this.userStore.dispatch(new userActions.LoadDiscoverMovies());
  }
}
