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
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'kpd-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemsComponent implements OnInit, AfterViewInit {
  private _movies: Movie[];
  @Input()
  get movies(): Movie[] {
    return this._movies;
  }
  set movies(value: Movie[]) {
    this._movies = value;
    this.dataSource = new MatTableDataSource<Movie>(this.movies);
  }
  @Output() removeMovieFromList = new EventEmitter<string>();

  displayedColumns = ['poster', 'title', 'release_date', 'vote_average', 'actions'];
  dataSource: MatTableDataSource<Movie>;

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

  onDeleteMovieFromList(movie: Movie): void {
    this.removeMovieFromList.emit(movie.key);
  }

  private activateHandsetLayout(): void {
    this.displayedColumns = ['poster', 'title', 'vote_average', 'actions'];
  }
  private activateDesktopLayout(): void {
    this.displayedColumns = ['poster', 'title', 'release_date', 'vote_average', 'actions'];
  }
}
