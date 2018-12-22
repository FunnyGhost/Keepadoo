import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list.component';

const routes: Routes = [
  {
    path: 'movies/:id',
    component: MovieDetailsComponent
  },
  {
    path: ':id',
    component: MovieListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieListRoutingModule {}
