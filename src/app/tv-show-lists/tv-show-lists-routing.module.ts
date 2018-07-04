import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowListsComponent } from './tv-show-lists.component';

const routes: Routes = [
  {
    path: '',
    component: TvShowListsComponent,
    children: [
      {
        path: ':id',
        loadChildren: 'src/app/tv-show-lists/tv-show-list/tv-show-list.module#TvShowListModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowListsRoutingModule {}
