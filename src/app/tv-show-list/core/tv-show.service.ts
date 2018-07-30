import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TvShow } from './models/tv-show';
import { TvShowSearchResult } from './models/tv-show-search-result';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  constructor(private db: AngularFireDatabase) {}

  public getTvShowsInList(listId: string): Observable<TvShow[]> {
    return this.db
      .list(`tv-shows/${listId}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(data => ({ key: data.payload.key, ...data.payload.val() } as TvShow));
        }),
        take(1)
      );
  }

  public addTvShowToList(listId: string, tvShow: TvShowSearchResult): Observable<void> {
    return from(this.db.list(`tv-shows/${listId}`).push(tvShow));
  }

  public deleteTvShowFromList(listId: string, tvShowKey: string): Observable<void> {
    return from(this.db.list(`tv-shows/${listId}`).remove(tvShowKey));
  }
}
