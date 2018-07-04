import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { AuthenticationGuard } from './core/authentication.guard';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'user',
    canActivate: [AuthenticationGuard],
    loadChildren: 'src/app/user/user.module#UserModule'
  },
  {
    path: 'movie-lists',
    canActivate: [AuthenticationGuard],
    loadChildren: 'src/app/movie-lists/movie-lists.module#MovieListsModule'
  },
  {
    path: 'tv-show-lists',
    canActivate: [AuthenticationGuard],
    loadChildren: 'src/app/tv-show-lists/tv-show-lists.module#TvShowListsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
