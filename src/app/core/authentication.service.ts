import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import { AuthenticationModel } from '../authentication.model';
import { UserState } from '../state/state';
import * as actions from '../state/user.action';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly publicUrls: string[] = ['/user/login', '/user/register', '/'];

  constructor(private afAuth: AngularFireAuth, store: Store<UserState>, router: Router) {
    this.afAuth.authState.subscribe((user: User | null) => {
      const currentUrl = router.url;
      if (user) {
        store.dispatch(new actions.SetCurrentUser({ userId: user.uid, email: user.email || '' }));
        if (this.publicUrls.includes(currentUrl)) {
          router.navigateByUrl('/movie-lists');
        }
      } else {
        store.dispatch(new actions.ClearCurrentUser());
        if (!this.publicUrls.includes(currentUrl)) {
          router.navigateByUrl('/');
        }
      }
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
  public register(user: AuthenticationModel) {
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

  public login(user: AuthenticationModel) {
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
