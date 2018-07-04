import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TvShowListsSharedModule } from '../shared/tv-show-lists-shared.module';
import { TvShowListRoutingModule } from './tv-show-list-routing.module';
import { TvShowListComponent } from './tv-show-list.component';

@NgModule({
  imports: [CommonModule, TvShowListRoutingModule, TvShowListsSharedModule, SharedModule],
  declarations: [TvShowListComponent]
})
export class TvShowListModule {}
