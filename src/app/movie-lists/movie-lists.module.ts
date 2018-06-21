import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MovieListsRoutingModule } from './movie-lists-routing.module';
import { MovieListsComponent } from './movie-lists.component';

@NgModule({
  imports: [CommonModule, MovieListsRoutingModule],
  declarations: [MovieListsComponent]
})
export class MovieListsModule {}
