import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, mapTo, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as userActions from '../../state//user.action';
import { TvShow } from '../core/models/tv-show';
import { TvShowList } from '../core/models/tv-show-list';
import { TvShowService } from '../core/tv-show.service';
import * as tvShowActions from './tv-show.action';
import * as tvShowSelectors from './tv-show.state';
import { TvShowState } from './tv-show.state';

@Injectable()
export class TvShowEffect {
  constructor(
    private actions$: Actions,
    private tvShowService: TvShowService,
    private tvShowStore: Store<TvShowState>
  ) {}

  @Effect()
  loadTvShowsInList$ = this.actions$.pipe(
    ofType(tvShowActions.TvShowActionTypes.LoadTvShowsInList),
    withLatestFrom(
      this.tvShowStore.pipe(
        select(tvShowSelectors.getCurrentList),
        filter(Boolean)
      )
    ),
    mergeMap(([action, currentTvShowList]) =>
      this.tvShowService.getTvShowsInList(currentTvShowList.key).pipe(
        map((tvShows: TvShow[]) => new tvShowActions.LoadTvShowsInListSuccess(tvShows)),
        catchError(err => of(new tvShowActions.LoadTvShowsInListFailed(err)))
      )
    )
  );

  @Effect()
  selectTvShowList$ = this.actions$.pipe(
    ofType(tvShowActions.TvShowActionTypes.SelectTvShowList),
    map(() => new tvShowActions.LoadTvShowsInList())
  );

  @Effect()
  loadTvShowsInListSetLoading$ = this.actions$.pipe(
    ofType(tvShowActions.TvShowActionTypes.LoadTvShowsInList),
    mapTo(new userActions.SetIsLoading())
  );

  @Effect()
  loadTvShowsInListSuccess$ = this.actions$.pipe(
    ofType(tvShowActions.TvShowActionTypes.LoadTvShowsInListSuccess),
    mapTo(new userActions.SetIsNotLoading())
  );

  @Effect()
  addTvShow$ = this.actions$.pipe(
    ofType(tvShowActions.TvShowActionTypes.AddTvShowToCurrentList),
    withLatestFrom(this.tvShowStore.pipe(select(tvShowSelectors.getCurrentList))),
    mergeMap(([action, currentTvShowList]: [tvShowActions.AddTvShowToCurrentList, TvShowList]) =>
      this.tvShowService.addTvShowToList(currentTvShowList.key, action.payload).pipe(
        map(() => new tvShowActions.AddTvShowToCurrentListSuccess()),
        catchError(err => of(new tvShowActions.AddTvShowToCurrentListFailed(err)))
      )
    )
  );

  @Effect()
  addTvShowSuccessThenLoad$ = this.actions$.pipe(
    ofType(tvShowActions.TvShowActionTypes.AddTvShowToCurrentListSuccess),
    map(() => new tvShowActions.LoadTvShowsInList())
  );

  @Effect()
  addTvShowSuccessThenSetMessage$ = this.actions$.pipe(
    ofType(tvShowActions.TvShowActionTypes.AddTvShowToCurrentListSuccess),
    map(() => new userActions.SetUserMessage('Tv show added to list'))
  );

  @Effect()
  removeTvShow$ = this.actions$.pipe(
    ofType(tvShowActions.TvShowActionTypes.RemoveTvShowFromCurrentList),
    withLatestFrom(this.tvShowStore.pipe(select(tvShowSelectors.getCurrentList))),
    mergeMap(
      ([action, currentTvShowList]: [tvShowActions.RemoveTvShowFromCurrentList, TvShowList]) =>
        this.tvShowService.deleteTvShowFromList(currentTvShowList.key, action.payload.key).pipe(
          map(() => new tvShowActions.RemoveTvShowFromCurrentListSuccess(action.payload)),
          catchError(err => of(new tvShowActions.RemoveTvShowFromCurrentListFailed(err)))
        )
    )
  );

  @Effect()
  removeTvShowSuccess$ = this.actions$.pipe(
    ofType(tvShowActions.TvShowActionTypes.RemoveTvShowFromCurrentListSuccess),
    map(() => new userActions.SetUserMessage('Tv show removed from list'))
  );
}
