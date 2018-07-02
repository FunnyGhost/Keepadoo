import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { Movie } from '../../core/models/movie';
import { MovieComponent } from './movie.component';

const movieToUse: Movie = {
  key: 'some-key-here',
  title: 'The laughing joke',
  vote_average: 5,
  vote_count: 9999,
  overview: 'Crazinest at its best',
  poster_path: 'some-path-here'
};

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, MatIconModule],
      declarations: [MovieComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.movie = movieToUse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when the user wants to delete the movie', done => {
    const deleteButton = fixture.debugElement.queryAll(By.css('.delete-button'));
    expect(deleteButton.length).toBe(1);

    component.movieDeleted.subscribe((movieKey: string) => {
      expect(movieKey).toBe(movieToUse.key);
      done();
    });

    deleteButton[0].triggerEventHandler('click', null);
  });

  describe('rendering', () => {
    it('should contain the movie title', () => {
      expect(fixture.debugElement.nativeElement.innerHTML).toContain(movieToUse.title);
    });

    it('should contain the poster image', () => {
      expect(fixture.debugElement.nativeElement.innerHTML).toContain(movieToUse.poster_path);
    });
  });
});
