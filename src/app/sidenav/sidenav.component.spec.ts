import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MovieListsService } from '../movie-list/core/movie-lists.service';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './sidenav.component';

const mockMovieListsService = {
  getMovieLists() {
    return of([]);
  }
};

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [SidenavComponent],
      providers: [
        {
          provide: MovieListsService,
          useValue: mockMovieListsService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
