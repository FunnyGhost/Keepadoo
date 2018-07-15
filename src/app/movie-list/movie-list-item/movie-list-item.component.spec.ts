import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MovieService } from 'src/app/movie-list/core/movie.service';
import { MockActivatedRoute, mockModalService } from '../../../test-utilities/mocks';
import { ModalService } from '../../core/modal.service';
import { SharedModule } from '../../shared/shared.module';
import { MovieList } from '../core/models/movie-list';
import { MovieSearchResult } from '../core/models/movie-search-result';
import { MovieListItemComponent } from './movie-list-item.component';

const movieListToUse: MovieList = {
  key: 'some-key',
  name: 'The awesome list'
};

const mockMovieService = {
  getMoviesInList(listId: string) {
    return of([]);
  },
  addMovieToList(listId: string, movie: MovieSearchResult) {},
  deleteMovieFromList(listId: string, movieKey: string) {}
};

describe('MovieListItemComponent', () => {
  let component: MovieListItemComponent;
  let fixture: ComponentFixture<MovieListItemComponent>;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {}
        };
      }
    });

    Object.defineProperty(window, 'getComputedStyle', {
      value: () => {
        return {
          getPropertyValue: () => {}
        };
      }
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [MovieListItemComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        },
        {
          provide: MovieService,
          useValue: mockMovieService
        },
        {
          provide: ModalService,
          useValue: mockModalService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListItemComponent);
    component = fixture.componentInstance;
    component.movieList = movieListToUse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
