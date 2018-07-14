import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { mockModalService } from '../../test-utilities/mocks';
import { ModalService } from '../core/modal.service';
import { SharedModule } from '../shared/shared.module';
import { MovieListsService } from './core/movie-lists.service';
import { MovieListComponent } from './movie-list.component';

const mockMovieListsService = {
  getMovieLists() {
    return new BehaviorSubject<any[]>([{}]);
  },
  addMoviesList() {}
};

describe('MovieListsComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [MovieListComponent],
      providers: [
        {
          provide: MovieListsService,
          useValue: mockMovieListsService
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
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
