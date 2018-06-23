import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';

@NgModule({
  imports: [CommonModule, MovieListRoutingModule, SharedModule],
  declarations: [MovieListComponent]
})
export class MovieListModule {}
