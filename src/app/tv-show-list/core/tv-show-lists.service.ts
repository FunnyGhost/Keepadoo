import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from '../../core/models/user';
import { UserService } from '../../core/user.service';
import { TvShowList } from './models/tv-show-list';

@Injectable({
  providedIn: 'root'
})
export class TvShowListsService {
  private userTvShowLists = new BehaviorSubject<AngularFireList<{}>>({} as AngularFireList<{}>);

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.setupTvShowListsSubscription();
  }

  public getTvShowLists(): Observable<TvShowList[]> {
    return this.userTvShowLists.pipe(
      filter((firebaseData: AngularFireList<{}>) => {
        return !!firebaseData;
      }),
      switchMap((firebaseData: AngularFireList<{}>) => {
        return firebaseData.snapshotChanges();
      }),
      map(changes => {
        return changes.map(
          data => ({ key: data.payload.key, ...data.payload.val() } as TvShowList)
        );
      }),
      take(1)
    );
  }

  public addTvShowList(name: string): Observable<void> {
    return this.userTvShowLists.pipe(
      switchMap((data: AngularFireList<{}>) => {
        return from(data.push({ name }));
      })
    );
  }

  public deleteTvShowList(key: string): Observable<string> {
    return this.userTvShowLists.pipe(
      switchMap((data: AngularFireList<{}>) => {
        data.remove(key);
        return from(this.db.list(`tv-shows`).remove(key));
      }),
      map(() => key)
    );
  }

  private setupTvShowListsSubscription() {
    this.userService.userProfile$
      .pipe(
        filter((user: User) => {
          return !!user && !!user.sub;
        }),
        tap((user: User) => {
          this.userTvShowLists.next(this.db.list(`tv-shows-lists/${user.sub}`));
        })
      )
      .subscribe();
  }
}
