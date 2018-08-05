import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from '../../core/models/user';
import { UserService } from '../../core/user.service';
import { MovieList } from './models/movie-list';

@Injectable({
  providedIn: 'root'
})
export class MovieListsService {
  private userMoviesList = new BehaviorSubject<AngularFireList<{}>>({} as AngularFireList<{}>);

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.setupMovieListSubscription();
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
      }),
      take(1)
    );
  }

  public addMovieList(name: string): Observable<void> {
    return this.userMoviesList.pipe(
      switchMap((data: AngularFireList<{}>) => {
        return from(data.push({ name }));
      })
    );
  }

  public deleteMovieList(key: string): Observable<string> {
    return this.userMoviesList.pipe(
      switchMap((data: AngularFireList<{}>) => {
        data.remove(key);
        return from(this.db.list(`movies`).remove(key));
      }),
      map(() => key)
    );
  }

  private setupMovieListSubscription() {
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
