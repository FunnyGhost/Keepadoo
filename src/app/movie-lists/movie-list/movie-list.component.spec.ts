import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MovieService } from 'src/app/movie-lists/core/movie.service';
import { MockActivatedRoute, mockModalService } from '../../../test-utilities/mocks';
import { ModalService } from '../../core/modal.service';
import { TMDBService } from '../../core/tmdb.service';
import { SharedModule } from '../../shared/shared.module';
import { MovieSearchResult } from '../core/models/movie-search-result';
import { MovieListsService } from '../core/movie-lists.service';
import { MovieListsSharedModule } from '../shared/movie-lists-shared.module';
import { MovieListComponent } from './movie-list.component';

const mockMovieService = {
  getMoviesInList(listId: string) {
    return of([]);
  },
  addMovieToList(listId: string, movie: MovieSearchResult) {},
  deleteMovieFromList(listId: string, movieKey: string) {}
};

const mockMovieListService = {
  deleteMovieList(listId: string) {
    return of({});
  }
};

const mockTMDBService = {
  searchMovies(text: string) {
    return of([]);
  }
};

fdescribe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

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
        MovieListsSharedModule,
        SharedModule
      ],
      declarations: [MovieListComponent],
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
          provide: MovieListsService,
          useValue: mockMovieListService
        },
        {
          provide: ModalService,
          useValue: mockModalService
        },
        {
          provide: TMDBService,
          useValue: mockTMDBService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list based on the :id in the url', () => {
    const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
    const movieService: MovieService = TestBed.get(MovieService);

    const listIdToUse = 'some-list-id';
    activatedRoute.setNewReturn(listIdToUse);
    spyOn(movieService, 'getMoviesInList').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(movieService.getMoviesInList).toHaveBeenCalledWith(listIdToUse);
  });

  it('should delete the list if the user confirms in the modal', () => {
    const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
    const movieListsService: MovieListsService = TestBed.get(MovieListsService);
    const modalService: ModalService = TestBed.get(ModalService);

    const listIdToUse = 'some-list-id';
    activatedRoute.setNewReturn(listIdToUse);
    spyOn(movieListsService, 'deleteMovieList').and.callThrough();
    spyOn(modalService, 'openModal').and.returnValue(of(true));

    component.ngOnInit();
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.queryAll(By.css('.delete-button'));
    expect(deleteButton.length).toBe(1);

    deleteButton[0].triggerEventHandler('click', null);

    expect(movieListsService.deleteMovieList).toHaveBeenCalledWith(listIdToUse);
  });

  it('should not delete the list if the user does not confirm in the modal', () => {
    const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
    const movieListsService: MovieListsService = TestBed.get(MovieListsService);
    const modalService: ModalService = TestBed.get(ModalService);

    const listIdToUse = 'some-list-id';
    activatedRoute.setNewReturn(listIdToUse);
    spyOn(movieListsService, 'deleteMovieList').and.callThrough();
    spyOn(modalService, 'openModal').and.returnValue(of(undefined));

    component.ngOnInit();
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.queryAll(By.css('.delete-button'));
    expect(deleteButton.length).toBe(1);

    deleteButton[0].triggerEventHandler('click', null);

    expect(movieListsService.deleteMovieList).not.toHaveBeenCalledWith(listIdToUse);
  });

  it('should delete the movie when the event is emitted', () => {
    const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
    const movieService: MovieService = TestBed.get(MovieService);

    const listIdToUse = 'some-list-id';
    activatedRoute.setNewReturn(listIdToUse);
    spyOn(movieService, 'getMoviesInList').and.callThrough();
    spyOn(movieService, 'deleteMovieFromList');

    component.ngOnInit();
    fixture.detectChanges();

    const movieToDeleteKey = 'some-movie-key-here';
    component.deleteMovie(movieToDeleteKey);

    expect(movieService.deleteMovieFromList).toHaveBeenCalledWith(listIdToUse, movieToDeleteKey);
  });

  describe('search', () => {
    it('should display an empty string', () => {
      expect(component.searchDisplayFunction({ title: 'Thor' } as MovieSearchResult)).toBe('');
      expect(component.searchDisplayFunction(undefined)).toBe('');
    });

    it('should add the selected movie to the current list', () => {
      const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
      const movieService: MovieService = TestBed.get(MovieService);
      const selectedMovie = { title: 'Thor' } as MovieSearchResult;
      const listIdToUse = 'some-list-id';
      activatedRoute.setNewReturn(listIdToUse);

      component.ngOnInit();
      fixture.detectChanges();

      spyOn(movieService, 'addMovieToList');

      component.searchResultSelected({
        option: { value: selectedMovie }
      } as MatAutocompleteSelectedEvent);

      expect(movieService.addMovieToList).toHaveBeenCalledWith(listIdToUse, selectedMovie);
    });
  });
});
