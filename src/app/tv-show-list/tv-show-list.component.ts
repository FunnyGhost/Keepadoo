import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ModalService } from '../core/modal.service';
import { ConfirmDeleteComponent } from '../shared/modals/confirm-delete/confirm-delete.component';
import { NewListComponent } from '../shared/modals/new-list/new-list.component';
import * as userSelectors from '../state/state';
import { UserState } from '../state/state';
import * as userActions from '../state/user.action';
import { TvShowList } from './core/models/tv-show-list';
import * as tvShowActions from './state/tv-show.action';
import * as tvShowSelectors from './state/tv-show.state';
import { TvShowState } from './state/tv-show.state';

@Component({
  selector: 'kpd-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvShowListComponent implements OnInit {
  tvShowList$: Observable<TvShowList>;

  constructor(
    private userStore: Store<UserState>,
    private tvShowStore: Store<TvShowState>,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tvShowList$ = this.tvShowStore.pipe(select(tvShowSelectors.getCurrentList));

    this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          return params.get('id');
        }),
        switchMap((listId: string) => {
          return this.userStore.pipe(select(userSelectors.getTvShowLists)).pipe(
            map((tvShowLists: TvShowList[]) => {
              return tvShowLists.find((tvShowList: TvShowList) => tvShowList.key === listId);
            }),
            tap((tvShowList: TvShowList) => {
              if (tvShowList) {
                this.tvShowStore.dispatch(new tvShowActions.SelectTvShowList(tvShowList));
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
        const tvShowListToAdd: TvShowList = { key: null, name: result };
        this.userStore.dispatch(new userActions.AddTvShowList(tvShowListToAdd));
      }
    });
  }

  deleteList(listId: string): void {
    this.modalService.openModal(ConfirmDeleteComponent).subscribe(result => {
      if (result) {
        this.userStore.dispatch(new userActions.DeleteTvShowList(listId));
      }
    });
  }
}
