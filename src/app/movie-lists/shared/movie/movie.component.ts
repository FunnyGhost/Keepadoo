import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/movie-lists/core/models/movie';

@Component({
  selector: 'kpd-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  constructor() {}

  ngOnInit() {}
}
