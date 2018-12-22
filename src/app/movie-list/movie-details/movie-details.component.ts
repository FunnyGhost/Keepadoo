import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Movie } from '../core/models/movie';
import * as movieSelectors from '../state/movie.state';
import { MovieState } from '../state/movie.state';

@Component({
  selector: 'kpd-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public selectedMovie$: Observable<Movie>;

  constructor(private movieStore: Store<MovieState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.selectedMovie$ = this.movieStore.pipe(
      select(movieSelectors.getCurrentMovie),
      filter(Boolean)
    );

    this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          return params.get('id');
        })
      )
      .subscribe();
  }
}
