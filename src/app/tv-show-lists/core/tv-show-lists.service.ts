import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from '../../core/models/user';
import { UserService } from '../../core/user.service';
import { TvShowList } from './models/tv-show-list';

@Injectable({
  providedIn: 'root'
})
export class TvShowListsService {
  private userTvShowLists = new BehaviorSubject<AngularFireList<{}>>(null);

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
      })
    );
  }

  public addTvShowList(name: string): void {
    this.userTvShowLists
      .pipe(
        tap((data: AngularFireList<{}>) => {
          data.push({ name });
        }),
        take(1)
      )
      .subscribe();
  }

  public deleteTvShowList(key: string): void {
    this.userTvShowLists
      .pipe(
        tap((data: AngularFireList<{}>) => {
          data.remove(key);
          this.db.list(`tv-shows`).remove(key);
        }),
        take(1)
      )
      .subscribe();
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
