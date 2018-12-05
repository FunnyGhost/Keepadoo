import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TvShow } from './models/tv-show';
import { TvShowSearchResult } from './models/tv-show-search-result';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  constructor(private db: AngularFirestore) {}

  public getTvShowsInList(listId: string): Observable<TvShow[]> {
    return this.db
      .collection(`tv-shows`, ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('listId', '==', listId);
        return query;
      })
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(
            data => ({ key: data.payload.doc.id, ...data.payload.doc.data() } as TvShow)
          );
        }),
        take(1)
      );
  }

  public addTvShowToList(listId: string, tvShow: TvShowSearchResult): Observable<any> {
    return from(this.db.collection(`tv-shows`).add({ ...tvShow, listId }));
  }

  public deleteTvShowFromList(tvShowKey: string): Observable<any> {
    return from(
      this.db
        .collection(`tv-shows`)
        .doc(tvShowKey)
        .delete()
    );
  }
}
