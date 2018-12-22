import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/core/modal.service';
import { ConfirmDeleteComponent } from 'src/app/shared/modals/confirm-delete/confirm-delete.component';
import { UserState } from 'src/app/state/state';
import { filter } from '../../../../node_modules/rxjs/operators';
import * as userActions from '../../state/user.action';
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
  public displayMode$: Observable<DisplayMode>;
  public displayModes = DisplayMode;
  public movies$: Observable<Movie[]>;
  public currentMovieList$: Observable<MovieList>;

  constructor(
    private userStore: Store<UserState>,
    private store: Store<MovieState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
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
    this.modalService.openModal(ConfirmDeleteComponent).subscribe(result => {
      if (result) {
        this.userStore.dispatch(new userActions.DeleteMovieList(listId));
      }
    });
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
    this.router.navigate(['movies', movie.key], { relativeTo: this.activatedRoute });
  }
}
