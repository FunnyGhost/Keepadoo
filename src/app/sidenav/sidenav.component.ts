import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MovieList } from '../movie-list/core/models/movie-list';
import * as selectors from '../state/state';
import { UserState } from '../state/state';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';

@Component({
  selector: 'kpd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showMovieLists: boolean;
  movieLists$: Observable<MovieList[]>;
  showTvShowLists: boolean;
  tvShowLists$: Observable<TvShowList[]>;

  constructor(private userStore: Store<UserState>, private router: Router) {}

  ngOnInit() {
    this.setupRouteListening();

    this.movieLists$ = this.userStore.pipe(
      select(selectors.getMovieLists),
      filter(() => this.showMovieLists),
      tap((data: MovieList[]) => {
        if (data.length > 0) {
          this.router.navigate(['movie-lists', data[data.length - 1].key]);
        }
      })
    );

    this.tvShowLists$ = this.userStore.pipe(
      select(selectors.getTvShowLists),
      filter(() => this.showTvShowLists),
      tap((data: TvShowList[]) => {
        if (data.length > 0) {
          this.router.navigate(['tv-show-lists', data[data.length - 1].key]);
        }
      })
    );
  }

  private setupRouteListening() {
    this.router.events
      .pipe(filter(e => e instanceof RouterEvent && e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const currentEvent = e as RouterEvent;
        if (currentEvent.url.includes('movie-lists')) {
          this.showMovieLists = true;
          this.showTvShowLists = false;
        } else if (currentEvent.url.includes('tv-show-lists')) {
          this.showTvShowLists = true;
          this.showMovieLists = false;
        }
      });
  }
}
