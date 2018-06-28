import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieList } from 'src/app/movie-lists/core/models/movie-list';
import { MovieListsService } from 'src/app/movie-lists/core/movie-lists.service';
import { ModalService } from '../core/modal.service';
import { NewListComponent } from '../shared/modals/new-list/new-list.component';

@Component({
  selector: 'kpd-movie-lists',
  templateUrl: './movie-lists.component.html',
  styleUrls: ['./movie-lists.component.scss']
})
export class MovieListsComponent implements OnInit {
  movieLists$: Observable<MovieList[]>;

  constructor(private movieListsService: MovieListsService, private modalService: ModalService) {}

  ngOnInit() {
    this.movieLists$ = this.movieListsService.getMovieLists();
  }

  addList() {
    this.modalService.openModal(NewListComponent).subscribe(result => {
      if (result) {
        this.movieListsService.addMoviesList(result);
      }
    });
  }
}
