import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListsComponent } from './movie-lists.component';

const routes: Routes = [
  {
    path: '',
    component: MovieListsComponent
  },
  {
    path: ':id',
    loadChildren: 'src/app/movie-lists/movie-list/movie-list.module#MovieListModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieListsRoutingModule {}
