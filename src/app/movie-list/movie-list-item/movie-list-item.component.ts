import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable, of } from 'rxjs';
import { auditTime, filter, tap } from 'rxjs/operators';
import { TMDBService } from '../../core/tmdb.service';
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
  @Input() movieList: MovieList;

  @Output() deleteList = new EventEmitter<string>();

  movies$: Observable<Movie[]>;
  movieResults$: Observable<MovieSearchResult[]>;

  movieSearchInputControl = new FormControl();

  constructor(private movieService: MovieService, private tmdbService: TMDBService) {}

  ngOnInit() {
    this.getMoviesInList();
    this.setupSearch();
  }

  onDeleteList(): void {
    this.deleteList.emit(this.movieList.key);
  }

  deleteMovie(movieKey: string): void {
    this.movieService.deleteMovieFromList(this.movieList.key, movieKey);
  }

  searchDisplayFunction(movie?: MovieSearchResult): string | undefined {
    return '';
  }

  searchResultSelected(selectedOption: MatAutocompleteSelectedEvent) {
    const selectedSearchResult = selectedOption.option.value as MovieSearchResult;
    this.movieService.addMovieToList(this.movieList.key, selectedSearchResult);
    this.movieResults$ = of([]);
  }

  private setupSearch(): void {
    this.movieSearchInputControl.valueChanges
      .pipe(
        auditTime(500),
        filter((searchText: string) => {
          return searchText.length >= 2;
        }),
        tap((searchText: string) => {
          this.movieResults$ = this.tmdbService.searchMovies(searchText);
        })
      )
      .subscribe();
  }

  private getMoviesInList(): void {
    this.movies$ = this.movieService.getMoviesInList(this.movieList.key);
  }
}
