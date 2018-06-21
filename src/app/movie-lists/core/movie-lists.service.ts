import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieListsService {
  public movieLists$: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.movieLists$ = db.list('movies-lists').valueChanges();
  }
}
