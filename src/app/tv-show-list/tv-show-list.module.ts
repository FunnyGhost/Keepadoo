import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core/core.module';
import { GridItemsComponent } from './tv-show-list-item/grid-items/grid-items.component';
import { ListItemsComponent } from './tv-show-list-item/list-items/list-items.component';
import { TvShowListItemComponent } from './tv-show-list-item/tv-show-list-item.component';
import { TvShowSearchComponent } from './tv-show-list-item/tv-show-search/tv-show-search.component';
import { TvShowListRoutingModule } from './tv-show-list-routing.module';
import { TvShowListComponent } from './tv-show-list.component';

@NgModule({
  imports: [CommonModule, TvShowListRoutingModule, SharedModule, CoreModule],
  declarations: [
    TvShowListComponent,
    TvShowListItemComponent,
    ListItemsComponent,
    TvShowSearchComponent,
    GridItemsComponent
  ]
})
export class TvShowListModule {}
