import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from '../../../../node_modules/rxjs/operators';
import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import { MovieSearchResult } from '../core/models/movie-search-result';
import * as actions from '../state/movie.action';
import * as selectors from '../state/movie.state';
import { MovieState } from '../state/movie.state';

@Component({
  selector: 'kpd-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListItemComponent implements OnInit {
  @Output()
  deleteList = new EventEmitter<string>();

  public displayMode$: Observable<DisplayMode>;
  public displayModes = DisplayMode;
  public movies$: Observable<Movie[]>;
  public currentMovieList$: Observable<MovieList>;

  constructor(
    private store: Store<MovieState>,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentMovieList$ = this.store.pipe(
      select(selectors.getCurrentList),
      filter(Boolean)
    );
    this.movies$ = this.store.pipe(select(selectors.getMoviesInCurrentList));
    this.displayMode$ = this.store.pipe(select(selectors.getDisplayMode));
  }

  onDeleteList(listId: string): void {
    this.deleteList.emit(listId);
  }

  onDisplayModeChanged(change: MatButtonToggleChange): void {
    this.store.dispatch(new actions.ChangeListDisplayMode(change.value));
  }

  deleteMovie(movieKey: string): void {
    this.store.dispatch(new actions.RemoveMovieFromCurrentList({ key: movieKey } as Movie));
  }

  onAddMovieToList(selectedMovie: MovieSearchResult) {
    this.store.dispatch(new actions.AddMovieToCurrentList(selectedMovie));
  }

  selectMovie(movie: Movie): void {
    this.store.dispatch(new actions.SelectMovie(movie));
    this.router.navigate(['../movies', movie.key], { relativeTo: this.route });
  }
}
