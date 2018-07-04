import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TvShow } from 'src/app/tv-show-lists/core/models/tv-show';

@Component({
  selector: 'kpd-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit {
  @Input() tvShow: TvShow;

  @Output() tvShowDeleted = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onDeleteTvShow(): void {
    this.tvShowDeleted.emit(this.tvShow.key);
  }
}
