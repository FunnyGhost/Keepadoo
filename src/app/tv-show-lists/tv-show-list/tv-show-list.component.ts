import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { auditTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { ModalService } from '../../core/modal.service';
import { TMDBService } from '../../core/tmdb.service';
import { ConfirmDeleteComponent } from '../../shared/modals/confirm-delete/confirm-delete.component';
import { TvShow } from '../core/models/tv-show';
import { TvShowSearchResult } from '../core/models/tv-show-search-result';
import { TvShowListsService } from '../core/tv-show-lists.service';
import { TvShowService } from '../core/tv-show.service';

@Component({
  selector: 'kpd-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.scss']
})
export class TvShowListComponent implements OnInit {
  tvShows$: Observable<TvShow[]>;
  listId: string;

  tvShowSearchInputControl = new FormControl();
  tvShowResults$: Observable<TvShowSearchResult[]>;

  constructor(
    private route: ActivatedRoute,
    private tvShowService: TvShowService,
    private tmdbService: TMDBService,
    private tvShowListsService: TvShowListsService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getTvShowsInList();
    this.setupSearch();
  }

  deleteList(): void {
    this.modalService.openModal(ConfirmDeleteComponent).subscribe(result => {
      if (result) {
        this.tvShowListsService.deleteTvShowList(this.listId);
      }
    });
  }

  searchDisplayFunction(tvShow?: TvShowSearchResult): string | undefined {
    return '';
  }

  searchResultSelected(selectedOption: MatAutocompleteSelectedEvent) {
    const selectedSearchResult = selectedOption.option.value as TvShowSearchResult;
    this.tvShowService.addTvShowToList(this.listId, selectedSearchResult);
    this.tvShowResults$ = of([]);
  }

  deleteTvShow(tvShowKey: string): void {
    this.tvShowService.deleteTvShowFromList(this.listId, tvShowKey);
  }

  private setupSearch(): void {
    this.tvShowSearchInputControl.valueChanges
      .pipe(
        auditTime(500),
        filter((searchText: string) => {
          return searchText.length >= 2;
        }),
        tap((searchText: string) => {
          this.tvShowResults$ = this.tmdbService.searchTvShows(searchText);
        })
      )
      .subscribe();
  }

  private getTvShowsInList(): void {
    this.tvShows$ = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get('id');
      }),
      tap((listId: string) => {
        this.listId = listId;
      }),
      switchMap((listId: string) => {
        return this.tvShowService.getTvShowsInList(listId);
      })
    );
  }
}
