import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TvShow } from '../../core/models/tv-show';

@Component({
  selector: 'kpd-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemsComponent implements OnInit, AfterViewInit {
  private _tvShows: TvShow[];
  @Input()
  get tvShows(): TvShow[] {
    return this._tvShows;
  }
  set tvShows(value: TvShow[]) {
    this._tvShows = value;
    this.dataSource = new MatTableDataSource<TvShow>(this.tvShows);
  }
  @Output() removeTvShowFromList = new EventEmitter<string>();

  displayedColumns = ['poster', 'title', 'release_date', 'vote_average', 'actions'];
  dataSource: MatTableDataSource<TvShow>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        if (result.matches) {
          this.activateHandsetLayout();
        } else {
          this.activateDesktopLayout();
        }
      });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onDeleteTvShowFromList(tvShow: TvShow): void {
    this.removeTvShowFromList.emit(tvShow.key);
  }

  private activateHandsetLayout(): void {
    this.displayedColumns = ['poster', 'title', 'vote_average', 'actions'];
  }
  private activateDesktopLayout(): void {
    this.displayedColumns = ['poster', 'title', 'release_date', 'vote_average', 'actions'];
  }
}
