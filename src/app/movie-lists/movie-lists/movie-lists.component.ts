import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieListsService } from '../core/movie-lists.service';

@Component({
  selector: 'kpd-movie-lists',
  templateUrl: './movie-lists.component.html',
  styleUrls: ['./movie-lists.component.scss']
})
export class MovieListsComponent implements OnInit {
  movieLists: Observable<any[]>;

  constructor(public movieListsService: MovieListsService) {}

  ngOnInit() {
    this.movieLists = this.movieListsService.movieLists;
  }
}
