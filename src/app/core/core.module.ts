import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { UserEffect } from '../state/user.effect';
import { reducer } from '../state/user.reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('users', reducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UserEffect]),
    MatSnackBarModule
  ],
  providers: [],
  declarations: []
})
export class CoreModule {}
