import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MovieList } from '../movie-lists/core/models/movie-list';
import { MovieListsService } from '../movie-lists/core/movie-lists.service';
import { TvShowList } from '../tv-show-lists/core/models/tv-show-list';
import { TvShowListsService } from '../tv-show-lists/core/tv-show-lists.service';

@Component({
  selector: 'kpd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showMovieLists: boolean;
  showTvShowLists: boolean;

  movieLists$: Observable<MovieList[]>;
  tvShowLists$: Observable<TvShowList[]>;

  constructor(
    private movieListsService: MovieListsService,
    private tvShowListsService: TvShowListsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieLists$ = this.movieListsService.getMovieLists();
    this.tvShowLists$ = this.tvShowListsService.getTvShowLists();

    this.setupRouteListening();
  }

  private setupRouteListening() {
    this.router.events
      .pipe(filter(e => e instanceof RouterEvent && e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        if (e.url.includes('movie-lists')) {
          this.showMovieLists = true;
          this.showTvShowLists = false;
        } else if (e.url.includes('tv-show-lists')) {
          this.showMovieLists = false;
          this.showTvShowLists = true;
        }
      });
  }
}
