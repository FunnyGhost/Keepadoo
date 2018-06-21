import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieList } from 'src/app/movie-lists/core/models/movie-list';
import { MovieListsService } from 'src/app/movie-lists/core/movie-lists.service';

@Component({
  selector: 'kpd-movie-lists',
  templateUrl: './movie-lists.component.html',
  styleUrls: ['./movie-lists.component.scss']
})
export class MovieListsComponent implements OnInit {
  movieLists$: Observable<MovieList[]>;

  constructor(public movieListsService: MovieListsService) {}

  ngOnInit() {
    this.movieLists$ = this.movieListsService.getMovieLists();
  }
}
