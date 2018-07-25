import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../state/movie.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('movieLists', reducer)],
  declarations: []
})
export class CoreModule {}
