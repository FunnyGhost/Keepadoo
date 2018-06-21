import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { MovieListsService } from '../core/movie-lists.service';
import { MovieListsComponent } from './movie-lists.component';

const mockMovieListsService = {
  movieLists$: new BehaviorSubject<any[]>([{}])
};

describe('MovieListsComponent', () => {
  let component: MovieListsComponent;
  let fixture: ComponentFixture<MovieListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListsComponent],
      providers: [
        {
          provide: MovieListsService,
          useValue: mockMovieListsService
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
});
