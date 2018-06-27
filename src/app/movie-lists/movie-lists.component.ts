import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { MovieList } from 'src/app/movie-lists/core/models/movie-list';
import { MovieListsService } from 'src/app/movie-lists/core/movie-lists.service';
import { NewListComponent } from '../shared/modals/new-list/new-list.component';

@Component({
  selector: 'kpd-movie-lists',
  templateUrl: './movie-lists.component.html',
  styleUrls: ['./movie-lists.component.scss']
})
export class MovieListsComponent implements OnInit {
  movieLists$: Observable<MovieList[]>;

  constructor(public movieListsService: MovieListsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.movieLists$ = this.movieListsService.getMovieLists();
  }

  addList() {
    const dialogRef = this.dialog.open(NewListComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.movieListsService.addMoviesList(result);
      }
    });
  }

  deleteList(listId: string): void {
    console.log('delete list', listId);
  }
}
