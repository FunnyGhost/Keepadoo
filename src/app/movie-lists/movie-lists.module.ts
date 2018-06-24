import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MovieListsRoutingModule } from './movie-lists-routing.module';
import { MovieListsComponent } from './movie-lists.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [CommonModule, MovieListsRoutingModule, SharedModule],
  declarations: [MovieListsComponent]
})
export class MovieListsModule {}
