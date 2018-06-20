import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userProfile$ = new BehaviorSubject<User>(null);
  get userProfile$(): Observable<User> {
    return this._userProfile$.asObservable();
  }

  constructor() {}

  updateUser(user: User): void {
    this._userProfile$.next(user);
  }
}
