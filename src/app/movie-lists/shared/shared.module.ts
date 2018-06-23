import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule, FlexLayoutModule, MatButtonModule],
  declarations: [MovieComponent],
  exports: [MovieComponent, FlexLayoutModule]
})
export class SharedModule {}
