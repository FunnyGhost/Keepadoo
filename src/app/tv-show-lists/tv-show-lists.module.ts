import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TvShowListsSharedModule } from './shared/tv-show-lists-shared.module';
import { TvShowListsRoutingModule } from './tv-show-lists-routing.module';
import { TvShowListsComponent } from './tv-show-lists.component';

@NgModule({
  imports: [CommonModule, TvShowListsRoutingModule, TvShowListsSharedModule, SharedModule],
  declarations: [TvShowListsComponent]
})
export class TvShowListsModule {}
