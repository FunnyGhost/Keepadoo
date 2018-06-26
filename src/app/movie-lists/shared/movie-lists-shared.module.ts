import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [MovieComponent],
  exports: [MovieComponent]
})
export class MovieListsSharedModule {}
