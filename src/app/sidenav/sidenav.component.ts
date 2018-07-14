import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MovieList } from '../movie-list/core/models/movie-list';
import { MovieListsService } from '../movie-list/core/movie-lists.service';

@Component({
  selector: 'kpd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showMovieLists: boolean;

  movieLists$: Observable<MovieList[]>;

  constructor(private movieListsService: MovieListsService, private router: Router) {}

  ngOnInit() {
    this.movieLists$ = this.movieListsService.getMovieLists();

    this.setupRouteListening();
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
