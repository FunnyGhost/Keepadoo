import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TvShowList } from 'src/app/tv-show-lists/core/models/tv-show-list';
import { TvShowListsService } from 'src/app/tv-show-lists/core/tv-show-lists.service';
import { ModalService } from '../core/modal.service';
import { NewListComponent } from '../shared/modals/new-list/new-list.component';

@Component({
  selector: 'kpd-tv-show-lists',
  templateUrl: './tv-show-lists.component.html',
  styleUrls: ['./tv-show-lists.component.scss']
})
export class TvShowListsComponent implements OnInit {
  tvShowLists$: Observable<TvShowList[]>;

  constructor(private tvShowListsService: TvShowListsService, private modalService: ModalService) {}

  ngOnInit() {
    this.tvShowLists$ = this.tvShowListsService.getTvShowLists();
  }

  addList() {
    this.modalService.openModal(NewListComponent).subscribe(result => {
      if (result) {
        this.tvShowListsService.addTvShowList(result);
      }
    });
  }
}
