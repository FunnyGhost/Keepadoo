import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ModalService } from '../core/modal.service';
import { ConfirmDeleteComponent } from '../shared/modals/confirm-delete/confirm-delete.component';
import { NewListComponent } from '../shared/modals/new-list/new-list.component';
import * as userSelectors from '../state/state';
import { UserState } from '../state/state';
import * as userActions from '../state/user.action';
import { MovieList } from './core/models/movie-list';
import * as movieActions from './state/movie.action';
import * as movieSelectors from './state/movie.state';
import { MovieState } from './state/movie.state';

@Component({
  selector: 'kpd-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
  movieList$: Observable<MovieList>;

  constructor(
    private userStore: Store<UserState>,
    private movieStore: Store<MovieState>,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movieList$ = this.movieStore.pipe(select(movieSelectors.getCurrentList));

    this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          return params.get('id');
        }),
        switchMap((listId: string) => {
          return this.userStore.pipe(select(userSelectors.getMovieLists)).pipe(
            take(1),
            map((movieLists: MovieList[]) => {
              return movieLists.find((movieList: MovieList) => movieList.key === listId);
            }),
            tap((movieList: MovieList) => {
              if (movieList) {
                this.movieStore.dispatch(new movieActions.SelectMovieList(movieList));
              }
            })
          );
        })
      )
      .subscribe();
  }

  addList() {
    this.modalService.openModal(NewListComponent).subscribe(result => {
      if (result) {
        const movieListToAdd: MovieList = { key: null, name: result };
        this.userStore.dispatch(new userActions.AddMovieList(movieListToAdd));
      }
    });
  }

  deleteList(listId: string): void {
    this.modalService.openModal(ConfirmDeleteComponent).subscribe(result => {
      if (result) {
        this.userStore.dispatch(new userActions.DeleteMovieList(listId));
      }
    });
  }
}
