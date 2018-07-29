import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Movie } from './models/movie';
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
        }),
        take(1)
      );
  }

  public addMovieToList(listId: string, movie: MovieSearchResult): Observable<void> {
    return from(this.db.list(`movies/${listId}`).push(movie));
  }

  public deleteMovieFromList(listId: string, movieKey: string): Observable<void> {
    return from(this.db.list(`movies/${listId}`).remove(movieKey));
  }
}
