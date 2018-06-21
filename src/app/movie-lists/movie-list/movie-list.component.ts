import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Movie } from '../core/models/movie';
import { MovieService } from '../core/movie.service';

@Component({
  selector: 'kpd-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    this.movies$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const movieListId = params.get('id');
        console.log('Movie list id is', movieListId);
        return this.movieService.getMoviesInList(movieListId);
      })
    );
  }
}
