import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TvShowComponent } from './tv-show/tv-show.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [TvShowComponent],
  exports: [TvShowComponent]
})
export class TvShowListsSharedModule {}
