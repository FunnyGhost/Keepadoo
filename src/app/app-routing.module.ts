import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'user',
    loadChildren: 'src/app/user/user.module#UserModule'
  },
  {
    path: 'movie-lists',
    loadChildren: 'src/app/movie-lists/movie-lists.module#MovieListsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
