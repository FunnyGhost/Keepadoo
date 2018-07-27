import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MovieList } from '../movie-list/core/models/movie-list';
import * as selectors from '../state/state';
import { UserState } from '../state/state';

@Component({
  selector: 'kpd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showMovieLists: boolean;
  movieLists$: Observable<MovieList[]>;

  constructor(private userStore: Store<UserState>, private router: Router) {}

  ngOnInit() {
    this.setupRouteListening();

    this.movieLists$ = this.userStore.pipe(select(selectors.getMovieLists)).pipe(
      tap((data: MovieList[]) => console.log('movie lists', data)),
      filter(() => this.showMovieLists),
      tap((data: MovieList[]) => {
        if (data.length > 0) {
          this.router.navigate(['movie-lists', data[data.length - 1].key]);
        }
      })
    );
  }

  private setupRouteListening() {
    this.router.events
      .pipe(filter(e => e instanceof RouterEvent && e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        if (e.url.includes('movie-lists')) {
          this.showMovieLists = true;
        }
      });
  }
}
