import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable, of } from 'rxjs';
import { auditTime, filter, tap } from 'rxjs/operators';
import { TMDBService } from '../../../core/tmdb.service';
import { TvShowSearchResult } from '../../core/models/tv-show-search-result';

@Component({
  selector: 'kpd-tv-show-search',
  templateUrl: './tv-show-search.component.html',
  styleUrls: ['./tv-show-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvShowSearchComponent implements OnInit {
  @Output() addTvShowToList = new EventEmitter<TvShowSearchResult>();

  tvShowResults$: Observable<TvShowSearchResult[]>;
  tvShowSearchInputControl = new FormControl();

  constructor(private tmdbService: TMDBService) {}

  ngOnInit() {
    this.setupSearch();
  }

  searchDisplayFunction(tvShow?: TvShowSearchResult): string | undefined {
    return '';
  }

  searchResultSelected(selectedOption: MatAutocompleteSelectedEvent) {
    const selectedSearchResult = selectedOption.option.value as TvShowSearchResult;
    this.addTvShowToList.emit(selectedSearchResult);

    this.tvShowResults$ = of([]);
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
}
