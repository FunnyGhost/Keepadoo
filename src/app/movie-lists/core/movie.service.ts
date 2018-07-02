import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/movie-lists/core/models/movie';
import { MovieSearchResult } from './models/movie-search-result';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private db: AngularFireDatabase) {}

  public getMoviesInList(listId: string): Observable<Movie[]> {
    return this.db
      .list(`movies/${listId}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(data => ({ key: data.payload.key, ...data.payload.val() } as Movie));
        })
      );
  }

  public addMovieToList(listId: string, movie: MovieSearchResult): void {
    this.db.list(`movies/${listId}`).push(movie);
  }
}
