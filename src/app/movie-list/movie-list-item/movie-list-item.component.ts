import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  private _movieList: MovieList;

  public displayMode: DisplayMode;
  public displayModes = DisplayMode;

  @Input()
  get movieList(): MovieList {
    return this._movieList;
  }
  set movieList(value: MovieList) {
    this._movieList = value;
    this.getMoviesInList();
  }
  @Output() deleteList = new EventEmitter<string>();

  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService, private store: Store<MovieState>) {}

  ngOnInit() {
    this.store.pipe(select(selectors.getDisplayMode)).subscribe((displayMode: DisplayMode) => {
      this.displayMode = displayMode;
    });
  }

  onDeleteList(): void {
    this.deleteList.emit(this.movieList.key);
  }

  onDisplayModeChanged(change: MatButtonToggleChange): void {
    this.store.dispatch(new actions.ChangeListDisplayMode(change.value));
  }

  deleteMovie(movieKey: string): void {
    this.movieService.deleteMovieFromList(this.movieList.key, movieKey);
  }

  onAddMovieToList(selectedMovie: MovieSearchResult) {
    this.movieService.addMovieToList(this.movieList.key, selectedMovie);
  }

  private getMoviesInList(): void {
    this.movies$ = this.movieService.getMoviesInList(this.movieList.key);
  }
}
