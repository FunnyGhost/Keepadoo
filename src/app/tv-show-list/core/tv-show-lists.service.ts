import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { filter, map, mapTo, take, tap } from 'rxjs/operators';
import { User } from '../../core/models/user';
import * as userSelectors from '../../state/state';
import { UserState } from '../../state/state';
import { TvShowList } from './models/tv-show-list';

@Injectable({
  providedIn: 'root'
})
export class TvShowListsService {
  private tvShowListsFirestoreCollection: AngularFirestoreCollection<{}>;
  private userId: string;

  constructor(private db: AngularFirestore, private userStore: Store<UserState>) {
    this.setupTvShowListSubscription();
  }

  public getTvShowLists(): Observable<TvShowList[]> {
    return this.tvShowListsFirestoreCollection.auditTrail().pipe(
      map(changes => {
        return changes.map(
          data => ({ key: data.payload.doc.id, ...data.payload.doc.data() } as TvShowList)
        );
      }),
      take(1)
    );
  }

  public addTvShowList(name: string): Observable<any> {
    return from(this.tvShowListsFirestoreCollection.add({ name: name, userId: this.userId }));
  }

  public deleteTvShowList(key: string): Observable<string> {
    this.deleteTvShowsInList(key);

    return from(this.tvShowListsFirestoreCollection.doc(key).delete()).pipe(mapTo(key));
  }

  private deleteTvShowsInList(listId: string): void {
    this.db
      .collection(`tv-shows`, ref => {
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

  private setupTvShowListSubscription() {
    this.userStore
      .pipe(
        select(userSelectors.getCurrentUser),
        filter((user: User | null) => {
          return !!user && !!user.userId;
        }),
        tap((user: User | null) => {
          if (user) {
            this.userId = user.userId;
            this.tvShowListsFirestoreCollection = this.db.collection(`tv-shows-lists`, ref => {
              let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
              query = query.where('userId', '==', this.userId);
              return query;
            });
          }
        })
      )
      .subscribe();
  }
}
