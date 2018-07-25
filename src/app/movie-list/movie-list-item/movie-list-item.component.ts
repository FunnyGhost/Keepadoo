import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import { MovieSearchResult } from '../core/models/movie-search-result';
import { MovieService } from '../core/movie.service';

@Component({
  selector: 'kpd-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent implements OnInit {
  private _movieList: MovieList;
  public displayMode: string;

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

  constructor(private movieService: MovieService, private store: Store<any>) {}

  ngOnInit() {
    this.store.pipe(select('movieLists')).subscribe(movieLists => {
      if (movieLists) {
        this.displayMode = movieLists.displayMode;
      }
    });
  }

  onDeleteList(): void {
    this.deleteList.emit(this.movieList.key);
  }

  onDisplayModeChanged(change: MatButtonToggleChange): void {
    this.store.dispatch({
      type: 'CHANGE_LIST_MODE',
      payload: change.value
    });
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
