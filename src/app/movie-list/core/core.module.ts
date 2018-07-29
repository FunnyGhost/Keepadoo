import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MovieEffect } from '../state/movie.effect';
import { reducer } from '../state/movie.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('movies', reducer),
    EffectsModule.forFeature([MovieEffect])
  ],
  declarations: []
})
export class CoreModule {}
