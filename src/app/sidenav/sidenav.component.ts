import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MovieList } from '../movie-list/core/models/movie-list';
import { MovieListsService } from '../movie-list/core/movie-lists.service';

@Component({
  selector: 'kpd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private _isAuthenticated: boolean;
  @Input()
  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
    if (!this._isAuthenticated) {
      this.showMovieLists = false;
    }
  }

  showMovieLists: boolean;

  movieLists$: Observable<MovieList[]>;

  constructor(private movieListsService: MovieListsService, private router: Router) {}

  ngOnInit() {
    this.movieLists$ = this.movieListsService.getMovieLists().pipe(
      filter(() => this.showMovieLists),
      filter((data: MovieList[]) => data.length > 0),
      tap((data: MovieList[]) => {
        this.router.navigate(['movie-lists', data[data.length - 1].key]);
      })
    );

    this.setupRouteListening();
  }

  private setupRouteListening() {
    this.router.events
      .pipe(filter(e => e instanceof RouterEvent && e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        if (this.isAuthenticated && e.url.includes('movie-lists')) {
          this.showMovieLists = true;
        }
      });
  }
}
