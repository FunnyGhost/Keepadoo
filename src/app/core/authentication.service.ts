import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import { take } from 'rxjs/operators';
import { AuthenticationModel } from '../authentication.model';
import * as selectors from '../state/state';
import { UserState } from '../state/state';
import * as actions from '../state/user.action';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private afAuth: AngularFireAuth,
    private store: Store<UserState>,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((user: User | null) => {
      if (user) {
        store.dispatch(new actions.SetCurrentUser({ userId: user.uid, email: user.email || '' }));
        this.checkForRedirectUrl();
      } else {
        store.dispatch(new actions.ClearCurrentUser());
        router.navigateByUrl('/');
      }
    });
  }

  private checkForRedirectUrl() {
    this.store
      .pipe(
        select(selectors.getRedirectUrl),
        take(1)
      )
      .subscribe((url: string) => {
        let redirectUrl = '/';
        if (url) {
          redirectUrl = url;
        }
        this.router.navigateByUrl(redirectUrl);
      });
  }

  public loginWithFacebook(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  public loginWithGoogle(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  public loginWithTwitter(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }
  public register(user: AuthenticationModel): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  public login(user: AuthenticationModel): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }
}
