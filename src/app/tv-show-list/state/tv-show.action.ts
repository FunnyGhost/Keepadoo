import { Action } from '@ngrx/store';
import { DisplayMode } from '../core/models/enums';
import { TvShow } from '../core/models/tv-show';
import { TvShowList } from '../core/models/tv-show-list';
import { TvShowSearchResult } from '../core/models/tv-show-search-result';

export enum TvShowActionTypes {
  ChangeListDisplayMode = '[TvShow] Change list display mode',
  SelectTvShowList = '[TvShow] Select tv-show list',
  LoadTvShowsInList = '[TvShow] Load tv-shows in list',
  LoadTvShowsInListSuccess = '[TvShow] Load tv-shows in list success',
  LoadTvShowsInListFailed = '[TvShow] Load tv-shows in list failed',
  AddTvShowToCurrentList = '[TvShow] Add new tv-show to current list',
  AddTvShowToCurrentListSuccess = '[TvShow] Add new tv-show to current list success',
  AddTvShowToCurrentListFailed = '[TvShow] Add new tv-show to current list failed',
  RemoveTvShowFromCurrentList = '[TvShow] Remove tv-show from current list',
  RemoveTvShowFromCurrentListSuccess = '[TvShow] Remove tv-show from current list success',
  RemoveTvShowFromCurrentListFailed = '[TvShow] Remove tv-show from current list failed'
}

export class ChangeListDisplayMode implements Action {
  readonly type = TvShowActionTypes.ChangeListDisplayMode;

  constructor(public payload: DisplayMode) {}
}

export class SelectTvShowList implements Action {
  readonly type = TvShowActionTypes.SelectTvShowList;

  constructor(public payload: TvShowList) {}
}

export class LoadTvShowsInList implements Action {
  readonly type = TvShowActionTypes.LoadTvShowsInList;
}

export class LoadTvShowsInListFailed implements Action {
  readonly type = TvShowActionTypes.LoadTvShowsInListFailed;

  constructor(public payload: string) {}
}

export class LoadTvShowsInListSuccess implements Action {
  readonly type = TvShowActionTypes.LoadTvShowsInListSuccess;

  constructor(public payload: TvShow[]) {}
}

export class AddTvShowToCurrentList implements Action {
  readonly type = TvShowActionTypes.AddTvShowToCurrentList;

  constructor(public payload: TvShowSearchResult) {}
}

export class AddTvShowToCurrentListFailed implements Action {
  readonly type = TvShowActionTypes.AddTvShowToCurrentListFailed;

  constructor(public payload: string) {}
}

export class AddTvShowToCurrentListSuccess implements Action {
  readonly type = TvShowActionTypes.AddTvShowToCurrentListSuccess;
}

export class RemoveTvShowFromCurrentList implements Action {
  readonly type = TvShowActionTypes.RemoveTvShowFromCurrentList;

  constructor(public payload: TvShow) {}
}

export class RemoveTvShowFromCurrentListFailed implements Action {
  readonly type = TvShowActionTypes.RemoveTvShowFromCurrentListFailed;

  constructor(public payload: string) {}
}

export class RemoveTvShowFromCurrentListSuccess implements Action {
  readonly type = TvShowActionTypes.RemoveTvShowFromCurrentListSuccess;

  constructor(public payload: TvShow) {}
}

export type TvShowActions =
  | ChangeListDisplayMode
  | SelectTvShowList
  | LoadTvShowsInList
  | LoadTvShowsInListFailed
  | LoadTvShowsInListSuccess
  | AddTvShowToCurrentList
  | AddTvShowToCurrentListFailed
  | AddTvShowToCurrentListSuccess
  | RemoveTvShowFromCurrentList
  | RemoveTvShowFromCurrentListFailed
  | RemoveTvShowFromCurrentListSuccess;
