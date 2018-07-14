import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'kpd-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];

  displayedColumns = ['poster', 'title', 'release_date', 'vote_average'];
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

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Movie>(this.movies);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private activateHandsetLayout(): void {
    this.displayedColumns = ['poster', 'title', 'vote_average'];
  }
  private activateDesktopLayout(): void {
    this.displayedColumns = ['poster', 'title', 'release_date', 'vote_average'];
  }
}
