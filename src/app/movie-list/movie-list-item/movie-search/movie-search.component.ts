import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable, of } from 'rxjs';
import { auditTime, filter, tap } from 'rxjs/operators';
import { TMDBService } from '../../../core/tmdb.service';
import { MovieSearchResult } from '../../core/models/movie-search-result';

@Component({
  selector: 'kpd-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  @Output() addMovieToList = new EventEmitter<MovieSearchResult>();

  movieResults$: Observable<MovieSearchResult[]>;

  movieSearchInputControl = new FormControl();

  constructor(private tmdbService: TMDBService) {}

  ngOnInit() {
    this.setupSearch();
  }

  searchDisplayFunction(movie?: MovieSearchResult): string | undefined {
    return '';
  }

  searchResultSelected(selectedOption: MatAutocompleteSelectedEvent) {
    const selectedSearchResult = selectedOption.option.value as MovieSearchResult;
    this.addMovieToList.emit(selectedSearchResult);

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
}
