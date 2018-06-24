import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { MovieListsService } from 'src/app/movie-lists/core/movie-lists.service';
import { MovieListsComponent } from './movie-lists.component';
import { SharedModule } from './shared/shared.module';

const mockMovieListsService = {
  getMovieLists() {
    return new BehaviorSubject<any[]>([{}]);
  }
};

describe('MovieListsComponent', () => {
  let component: MovieListsComponent;
  let fixture: ComponentFixture<MovieListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
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
