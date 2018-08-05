import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DisplayMode } from '../core/models/enums';
import { TvShow } from '../core/models/tv-show';
import { TvShowList } from '../core/models/tv-show-list';
import { TvShowSearchResult } from '../core/models/tv-show-search-result';
import * as actions from '../state/tv-show.action';
import * as selectors from '../state/tv-show.state';
import { TvShowState } from '../state/tv-show.state';

@Component({
  selector: 'kpd-tv-show-list-item',
  templateUrl: './tv-show-list-item.component.html',
  styleUrls: ['./tv-show-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvShowListItemComponent implements OnInit {
  @Output() deleteList = new EventEmitter<string>();

  public displayMode$: Observable<DisplayMode>;
  public displayModes = DisplayMode;
  public tvShows$: Observable<TvShow[]>;
  public currentTvShowList$: Observable<TvShowList>;

  constructor(private store: Store<TvShowState>) {}

  ngOnInit() {
    this.currentTvShowList$ = this.store.pipe(
      select(selectors.getCurrentList),
      filter(Boolean)
    );
    this.tvShows$ = this.store.pipe(select(selectors.getTvShowsInCurrentList));
    this.displayMode$ = this.store.pipe(select(selectors.getDisplayMode));
  }

  onDeleteList(listId: string): void {
    this.deleteList.emit(listId);
  }

  onDisplayModeChanged(change: MatButtonToggleChange): void {
    this.store.dispatch(new actions.ChangeListDisplayMode(change.value));
  }

  deleteTvShow(tvShowKey: string): void {
    this.store.dispatch(new actions.RemoveTvShowFromCurrentList({ key: tvShowKey }));
  }

  onAddTvShowToList(selectedTvShow: TvShowSearchResult) {
    this.store.dispatch(new actions.AddTvShowToCurrentList(selectedTvShow));
  }
}
