import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { MovieListsService } from 'src/app/movie-lists/core/movie-lists.service';
import { mockModalService } from '../../test-utilities/mocks';
import { ModalService } from '../core/modal.service';
import { SharedModule } from '../shared/shared.module';
import { MovieList } from './core/models/movie-list';
import { MovieListsComponent } from './movie-lists.component';
import { MovieListsSharedModule } from './shared/movie-lists-shared.module';

const mockMovieListsService = {
  getMovieLists() {
    return new BehaviorSubject<any[]>([{}]);
  },
  addMoviesList() {}
};

describe('MovieListsComponent', () => {
  let component: MovieListsComponent;
  let fixture: ComponentFixture<MovieListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MovieListsSharedModule, SharedModule],
      declarations: [MovieListsComponent],
      providers: [
        {
          provide: MovieListsService,
          useValue: mockMovieListsService
        },
        {
          provide: ModalService,
          useValue: mockModalService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all the lists', () => {
    const movieListsService: MovieListsService = TestBed.get(MovieListsService);
    spyOn(movieListsService, 'getMovieLists').and.callThrough();

    component.ngOnInit();

    expect(movieListsService.getMovieLists).toHaveBeenCalled();
  });

  it('should render all the lists', () => {
    const movieListsService: MovieListsService = TestBed.get(MovieListsService);
    const listsToUse: MovieList[] = [
      {
        name: 'list1',
        key: 'key1'
      },
      {
        name: 'list2',
        key: 'key2'
      }
    ];
    spyOn(movieListsService, 'getMovieLists').and.returnValue(of(listsToUse));

    component.ngOnInit();
    fixture.detectChanges();

    const movieLists = fixture.debugElement.queryAll(By.css('.movie-list'));
    expect(movieLists.length).toBe(listsToUse.length);
  });

  it('should add a new list if the user filled in a name', () => {
    const movieListsService: MovieListsService = TestBed.get(MovieListsService);
    spyOn(movieListsService, 'addMoviesList');

    const modalService: ModalService = TestBed.get(ModalService);
    const newListName = 'some-new-list-name';
    spyOn(modalService, 'openModal').and.returnValue(of(newListName));

    const addNewListButton = fixture.debugElement.queryAll(By.css('.add-list'));
    expect(addNewListButton.length).toBe(1);
    addNewListButton[0].triggerEventHandler('click', null);

    expect(modalService.openModal).toHaveBeenCalled();
    expect(movieListsService.addMoviesList).toHaveBeenCalledWith(newListName);
  });

  it('should not add a new list if the user dismissed the name modal', () => {
    const movieListsService: MovieListsService = TestBed.get(MovieListsService);
    spyOn(movieListsService, 'addMoviesList');

    const modalService: ModalService = TestBed.get(ModalService);
    spyOn(modalService, 'openModal').and.returnValue(of(undefined));

    const addNewListButton = fixture.debugElement.queryAll(By.css('.add-list'));
    expect(addNewListButton.length).toBe(1);
    addNewListButton[0].triggerEventHandler('click', null);

    expect(modalService.openModal).toHaveBeenCalled();
    expect(movieListsService.addMoviesList).not.toHaveBeenCalled();
  });
});
