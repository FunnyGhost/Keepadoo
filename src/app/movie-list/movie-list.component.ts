import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ModalService } from '../core/modal.service';
import { ConfirmDeleteComponent } from '../shared/modals/confirm-delete/confirm-delete.component';
import { NewListComponent } from '../shared/modals/new-list/new-list.component';
import { MovieList } from './core/models/movie-list';
import { MovieListsService } from './core/movie-lists.service';

@Component({
  selector: 'kpd-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movieList$: Observable<MovieList>;

  constructor(
    private movieListsService: MovieListsService,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movieList$ = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get('id');
      }),
      switchMap((listId: string) => {
        return this.movieListsService.getMovieLists().pipe(
          map((movieLists: MovieList[]) => {
            return movieLists.find((movieList: MovieList) => movieList.key === listId);
          })
        );
      })
    );
  }

  addList() {
    this.modalService.openModal(NewListComponent).subscribe(result => {
      if (result) {
        this.movieListsService.addMovieList(result);
      }
    });
  }

  deleteList(listId: string): void {
    this.modalService.openModal(ConfirmDeleteComponent).subscribe(result => {
      if (result) {
        this.movieListsService.deleteMovieList(listId);
      }
    });
  }
}
