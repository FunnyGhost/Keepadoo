import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MovieService } from 'src/app/movie-lists/core/movie.service';
import { MockActivatedRoute, mockModalService } from '../../../test-utilities/mocks';
import { ModalService } from '../../core/modal.service';
import { MovieListsService } from '../core/movie-lists.service';
import { MovieListsSharedModule } from '../shared/movie-lists-shared.module';
import { MovieListComponent } from './movie-list.component';

const mockMovieService = {
  getMoviesInList(listId: string) {
    return of([]);
  }
};

const mockMovieListService = {
  deleteMovieList(listId: string) {
    return of({});
  }
};

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MovieListsSharedModule],
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
});
