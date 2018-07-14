import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() movieList: MovieList;
  @Output() deleteList = new EventEmitter<string>();

  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMoviesInList();
  }

  onDeleteList(): void {
    this.deleteList.emit(this.movieList.key);
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
