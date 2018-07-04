import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { auditTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { ModalService } from '../../core/modal.service';
import { TMDBService } from '../../core/tmdb.service';
import { ConfirmDeleteComponent } from '../../shared/modals/confirm-delete/confirm-delete.component';
import { Movie } from '../core/models/movie';
import { MovieSearchResult } from '../core/models/movie-search-result';
import { MovieListsService } from '../core/movie-lists.service';
import { MovieService } from '../core/movie.service';

@Component({
  selector: 'kpd-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  listId: string;

  movieSearchInputControl = new FormControl();
  movieResults$: Observable<MovieSearchResult[]>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tmdbService: TMDBService,
    private movieListsService: MovieListsService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getMoviesInList();
    this.setupSearch();
  }

  deleteList(): void {
    this.modalService.openModal(ConfirmDeleteComponent).subscribe(result => {
      if (result) {
        this.movieListsService.deleteMovieList(this.listId);
      }
    });
  }

  searchDisplayFunction(movie?: MovieSearchResult): string | undefined {
    return '';
  }

  searchResultSelected(selectedOption: MatAutocompleteSelectedEvent) {
    const selectedSearchResult = selectedOption.option.value as MovieSearchResult;
    this.movieService.addMovieToList(this.listId, selectedSearchResult);
    this.movieResults$ = of([]);
  }

  deleteMovie(movieKey: string): void {
    this.movieService.deleteMovieFromList(this.listId, movieKey);
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
    this.movies$ = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get('id');
      }),
      tap((listId: string) => {
        this.listId = listId;
      }),
      switchMap((listId: string) => {
        return this.movieService.getMoviesInList(listId);
      })
    );
  }
}
