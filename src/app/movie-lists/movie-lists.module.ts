import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MovieListsRoutingModule } from './movie-lists-routing.module';
import { MovieListsComponent } from './movie-lists.component';
import { MovieListsSharedModule } from './shared/movie-lists-shared.module';

@NgModule({
  imports: [CommonModule, MovieListsRoutingModule, MovieListsSharedModule, SharedModule],
  declarations: [MovieListsComponent]
})
export class MovieListsModule {}
