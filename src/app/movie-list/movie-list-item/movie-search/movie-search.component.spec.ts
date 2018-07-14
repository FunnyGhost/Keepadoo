import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TMDBService } from '../../../core/tmdb.service';
import { SharedModule } from '../../../shared/shared.module';
import { MovieSearchComponent } from './movie-search.component';

const mockTMDBService = {
  searchMovies(text: string) {
    return of([]);
  }
};

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;

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
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [MovieSearchComponent],
      providers: [
        {
          provide: TMDBService,
          useValue: mockTMDBService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
