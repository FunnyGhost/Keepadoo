import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MovieListsSharedModule } from '../shared/movie-lists-shared.module';
import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';

@NgModule({
  imports: [CommonModule, MovieListRoutingModule, MovieListsSharedModule, SharedModule],
  declarations: [MovieListComponent]
})
export class MovieListModule {}
