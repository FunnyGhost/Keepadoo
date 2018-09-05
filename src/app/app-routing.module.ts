import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/authentication.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'user',
    loadChildren: 'src/app/user/user.module#UserModule'
  },
  {
    path: 'movie-lists',
    canActivate: [AuthenticationGuard],
    loadChildren: 'src/app/movie-list/movie-list.module#MovieListModule'
  },
  {
    path: 'tv-show-lists',
    canActivate: [AuthenticationGuard],
    loadChildren: 'src/app/tv-show-list/tv-show-list.module#TvShowListModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
