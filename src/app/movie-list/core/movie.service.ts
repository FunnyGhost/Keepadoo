import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Movie } from './models/movie';
import { MovieSearchResult } from './models/movie-search-result';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private db: AngularFirestore) {}

  public getMoviesInList(listId: string): Observable<Movie[]> {
    return this.db
      .collection(`movies`, ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('listId', '==', listId);
        return query;
      })
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(
            data => ({ key: data.payload.doc.id, ...data.payload.doc.data() } as Movie)
          );
        }),
        take(1)
      );
  }

  public addMovieToList(listId: string, movie: MovieSearchResult): Observable<any> {
    return from(this.db.collection(`movies`).add({ ...movie, listId }));
  }

  public deleteMovieFromList(listId: string, movieKey: string): Observable<void> {
    return from(
      this.db
        .collection(`movies`)
        .doc(movieKey)
        .delete()
    );
  }
}
