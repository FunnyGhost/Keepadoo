import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { filter, map, mapTo, take, tap } from 'rxjs/operators';
import { User } from '../../core/models/user';
import { UserService } from '../../core/user.service';
import { MovieList } from './models/movie-list';

@Injectable({
  providedIn: 'root'
})
export class MovieListsService {
  private movieListsFirestoreCollection: AngularFirestoreCollection<{}>;
  private userId: string;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.setupMovieListSubscription();
  }

  public getMovieLists(): Observable<MovieList[]> {
    return this.movieListsFirestoreCollection.auditTrail().pipe(
      map(changes => {
        return changes.map(
          data => ({ key: data.payload.doc.id, ...data.payload.doc.data() } as MovieList)
        );
      }),
      take(1)
    );
  }

  public addMovieList(name: string): Observable<any> {
    return from(this.movieListsFirestoreCollection.add({ name: name, userId: this.userId }));
  }

  public deleteMovieList(key: string): Observable<string> {
    this.deleteMoviesInList(key);

    return from(this.movieListsFirestoreCollection.doc(key).delete()).pipe(mapTo(key));
  }

  private deleteMoviesInList(listId: string): void {
    this.db
      .collection(`movies`, ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('listId', '==', listId);
        return query;
      })
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(data => {
        data.forEach(item => {
          item.payload.doc.ref.delete();
        });
      });
  }

  private setupMovieListSubscription() {
    this.userService.userProfile$
      .pipe(
        filter((user: User) => {
          return !!user && !!user.sub;
        }),
        tap((user: User) => {
          this.userId = user.sub;
          this.movieListsFirestoreCollection = this.db.collection(`movies-lists`, ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
            query = query.where('userId', '==', this.userId);
            return query;
          });
        })
      )
      .subscribe();
  }
}
