import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TvShowEffect } from '../state/tv-show.effect';
import { reducer } from '../state/tv-show.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tv-shows', reducer),
    EffectsModule.forFeature([TvShowEffect])
  ],
  declarations: []
})
export class CoreModule {}
