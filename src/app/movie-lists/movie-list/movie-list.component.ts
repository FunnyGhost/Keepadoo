import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Movie } from '../core/models/movie';
import { MovieService } from '../core/movie.service';

@Component({
  selector: 'kpd-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  listId: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    this.movies$ = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get('id');
      }),
      tap((listId: string) => {
        this.listId = listId;
      }),
      switchMap((listId: string) => {
        return this.movieService.getMoviesInList(listId);
      })
    );
  }

  deleteList(): void {
    console.log('delete list', this.listId);
  }
}
