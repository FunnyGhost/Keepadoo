import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListsComponent } from './movie-lists/movie-lists.component';

const routes: Routes = [
  {
    path: '',
    component: MovieListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieListsRoutingModule {}
