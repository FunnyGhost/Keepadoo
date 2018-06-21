import { TestBed, inject } from '@angular/core/testing';

import { MovieListsService } from './movie-lists.service';

describe('MovieListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieListsService]
    });
  });

  it('should be created', inject([MovieListsService], (service: MovieListsService) => {
    expect(service).toBeTruthy();
  }));
});
