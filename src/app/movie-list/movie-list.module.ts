import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core/core.module';
import { ListItemsComponent } from './movie-list-item/list-items/list-items.component';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';
import { MovieSearchComponent } from './movie-list-item/movie-search/movie-search.component';
import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';
import { GridItemsComponent } from './movie-list-item/grid-items/grid-items.component';

@NgModule({
  imports: [CommonModule, MovieListRoutingModule, SharedModule, CoreModule],
  declarations: [
    MovieListComponent,
    MovieListItemComponent,
    ListItemsComponent,
    MovieSearchComponent,
    GridItemsComponent
  ]
})
export class MovieListModule {}
