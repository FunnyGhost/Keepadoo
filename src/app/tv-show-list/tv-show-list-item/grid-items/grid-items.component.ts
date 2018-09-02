import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TvShow } from '../../core/models/tv-show';

@Component({
  selector: 'kpd-grid-items',
  templateUrl: './grid-items.component.html',
  styleUrls: ['./grid-items.component.scss']
})
export class GridItemsComponent implements OnInit {
  @Input()
  tvShows: TvShow[];

  @Output()
  removeTvShowFromList = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onDeleteTvShowFromList(tvShow: TvShow): void {
    this.removeTvShowFromList.emit(tvShow.key);
  }
}
