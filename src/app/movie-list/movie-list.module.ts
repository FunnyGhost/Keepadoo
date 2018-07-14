import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ListItemsComponent } from './movie-list-item/list-items/list-items.component';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';
import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';

@NgModule({
  imports: [CommonModule, MovieListRoutingModule, SharedModule],
  declarations: [MovieListComponent, MovieListItemComponent, ListItemsComponent]
})
export class MovieListModule {}
