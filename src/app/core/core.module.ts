import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { UserEffect } from '../state/user.effect';
import { reducer } from '../state/user.reducer';
import { RollbarErrorHandler } from './rollbar/rollbar-error-handler';
import { rollbarFactory } from './rollbar/rollbar-factory';
import { RollbarService } from './rollbar/rollbar.service';

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
  providers: [
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
  ],
  declarations: []
})
export class CoreModule {}
