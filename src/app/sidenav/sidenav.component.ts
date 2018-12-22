import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { MovieList } from '../movie-list/core/models/movie-list';
import * as selectors from '../state/state';
import { UserState } from '../state/state';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';
import { User } from '../core/models/user';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'kpd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  showMovieLists: boolean;
  showSubNav = false;
  movieLists$: Observable<MovieList[]>;
  showTvShowLists: boolean;
  tvShowLists$: Observable<TvShowList[]>;

  constructor(
    private authService: AuthenticationService,
    private userStore: Store<UserState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupRouteListening();

    this.movieLists$ = this.userStore.pipe(
      filter(() => this.showMovieLists),
      select(selectors.getMovieLists)
    );

    this.tvShowLists$ = this.userStore.pipe(
      filter(() => this.showTvShowLists),
      select(selectors.getTvShowLists),
      tap(data => console.log(data))
    );

    this.isLoggedIn$ = this.userStore
      .pipe(select(selectors.getCurrentUser))
      .pipe(map((user: User | null) => !!user));
  }

  public toggleSubNavigation() {
    this.showSubNav = !this.showSubNav;
  }

  private setupRouteListening() {
    this.router.events
      .pipe(filter(e => e instanceof RouterEvent && e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const currentEvent = e as RouterEvent;
        if (currentEvent.url.includes('movie-lists')) {
          this.showMovieLists = true;
          this.showTvShowLists = false;
          console.log('movie-lists', this.showTvShowLists);
        } else if (currentEvent.url.includes('tv-show-lists')) {
          this.showTvShowLists = true;
          this.showMovieLists = false;
          console.log('tv-show-lists', this.showTvShowLists);
        }
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
