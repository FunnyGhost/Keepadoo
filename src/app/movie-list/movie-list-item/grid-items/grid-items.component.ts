import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'kpd-grid-items',
  templateUrl: './grid-items.component.html',
  styleUrls: ['./grid-items.component.scss']
})
export class GridItemsComponent implements OnInit {
  @Input()
  movies: Movie[];

  @Output()
  removeMovieFromList = new EventEmitter<string>();

  @Output()
  selectMovie = new EventEmitter<Movie>();

  constructor() {}

  ngOnInit() {}

  onDeleteMovieFromList(movie: Movie): void {
    this.removeMovieFromList.emit(movie.key);
  }

  onSelectMovie(movie: Movie): void {
    this.selectMovie.emit(movie);
  }
}
