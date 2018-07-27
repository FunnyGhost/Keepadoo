import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from '../../../../node_modules/rxjs/operators';
import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import { MovieSearchResult } from '../core/models/movie-search-result';
import { MovieService } from '../core/movie.service';
import * as actions from '../state/movie.action';
import * as selectors from '../state/movie.state';
import { MovieState } from '../state/movie.state';

@Component({
  selector: 'kpd-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent implements OnInit {
  @Output() deleteList = new EventEmitter<string>();

  public displayMode$: Observable<DisplayMode>;
  public displayModes = DisplayMode;
  public movies$: Observable<Movie[]>;
  public currentMovieList: MovieList;

  constructor(private movieService: MovieService, private store: Store<MovieState>) {}

  ngOnInit() {
    this.store
      .pipe(
        select(selectors.getCurrentList),
        tap((movieList: MovieList) => {
          this.currentMovieList = movieList;
          this.getMoviesInList(movieList.key);
        })
      )
      .subscribe();
    this.displayMode$ = this.store.pipe(select(selectors.getDisplayMode));
  }

  onDeleteList(): void {
    this.deleteList.emit(this.currentMovieList.key);
  }

  onDisplayModeChanged(change: MatButtonToggleChange): void {
    this.store.dispatch(new actions.ChangeListDisplayMode(change.value));
  }

  deleteMovie(movieKey: string): void {
    this.movieService.deleteMovieFromList(this.currentMovieList.key, movieKey);
  }

  onAddMovieToList(selectedMovie: MovieSearchResult) {
    this.movieService.addMovieToList(this.currentMovieList.key, selectedMovie);
  }

  private getMoviesInList(listId: string): void {
    this.movies$ = this.movieService.getMoviesInList(listId);
  }
}
