import { inject, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { of } from 'rxjs';
import { MovieListsService } from './movie-lists.service';

const mockFirebaseDatabase = {
  list(collection: string) {
    return {
      valueChanges() {
        return of([{}]);
      }
    };
  }
};

describe('MovieListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieListsService,
        {
          provide: AngularFireDatabase,
          useValue: mockFirebaseDatabase
        }
      ]
    });
  });

  it('should be created', inject([MovieListsService], (service: MovieListsService) => {
    expect(service).toBeTruthy();
  }));
});
