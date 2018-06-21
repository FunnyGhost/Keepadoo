import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { UserService } from '../../core/user.service';

@Injectable({
  providedIn: 'root'
})
export class MovieListsService {
  constructor(private db: AngularFireDatabase, private userService: UserService) {}

  public getMovieLists(): Observable<any[]> {
    return this.userService.userProfile$.pipe(
      filter((user: User) => {
        return !!user && !!user.sub;
      }),
      switchMap((user: User) => {
        if (user) {
          return this.db.list(`movies-lists/${user.sub}`).valueChanges();
        }
      })
    );
  }
}
