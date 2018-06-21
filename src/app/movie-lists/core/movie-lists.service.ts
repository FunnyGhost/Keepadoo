import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { UserService } from '../../core/user.service';
import { MovieList } from './models/movie-list';

@Injectable({
  providedIn: 'root'
})
export class MovieListsService {
  private userMoviesList = new BehaviorSubject<AngularFireList<{}>>(null);

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.setupMoviesListSubscription();
  }

  public getMovieLists(): Observable<MovieList[]> {
    return this.userMoviesList.pipe(
      filter((firebaseData: AngularFireList<{}>) => {
        return !!firebaseData;
      }),
      switchMap((firebaseData: AngularFireList<{}>) => {
        return firebaseData.snapshotChanges();
      }),
      map(changes => {
        return changes.map(data => ({ key: data.payload.key, ...data.payload.val() } as MovieList));
      })
    );
  }

  private setupMoviesListSubscription() {
    this.userService.userProfile$
      .pipe(
        filter((user: User) => {
          return !!user && !!user.sub;
        }),
        tap((user: User) => {
          this.userMoviesList.next(this.db.list(`movies-lists/${user.sub}`));
        })
      )
      .subscribe();
  }
}
