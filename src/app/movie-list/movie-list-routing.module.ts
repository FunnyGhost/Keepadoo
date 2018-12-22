import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';
import { MovieListComponent } from './movie-list.component';

const routes: Routes = [
  {
    path: ':id',
    component: MovieListComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MovieListItemComponent
      },
      {
        path: 'movies/:id',
        component: MovieDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieListRoutingModule {}
