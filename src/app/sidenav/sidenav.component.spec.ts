import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MovieList } from '../movie-list/core/models/movie-list';
import { MovieListsService } from '../movie-list/core/movie-lists.service';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './sidenav.component';

@Component({
  template: ``
})
export class MockComponent {}

const lastMovieListKey = 'key2';
const mockMovieListsService = {
  getMovieLists() {
    return of([
      {
        key: 'key1',
        name: 'list1'
      } as MovieList,
      {
        key: lastMovieListKey,
        name: 'list2'
      } as MovieList
    ]);
  }
};

fdescribe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'movie-lists/key1',
            component: MockComponent
          },
          {
            path: 'movie-lists/key2',
            component: MockComponent
          }
        ]),
        SharedModule
      ],
      declarations: [SidenavComponent, MockComponent],
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

  it('should show the movie lists when the user is supposed to see them', () => {
    component.showMovieLists = true;
    fixture.detectChanges();
    const movieListsItems = fixture.debugElement.queryAll(By.css('.movie-list'));

    expect(movieListsItems.length).toBe(2);
  });

  it('should not show the movie lists when the user is not supposed to see them', () => {
    component.showMovieLists = false;
    fixture.detectChanges();
    const movieListsItems = fixture.debugElement.queryAll(By.css('.movie-list'));

    expect(movieListsItems.length).toBe(0);
  });

  it('should automatically navigate to the last item in the list', () => {
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.showMovieLists = true;

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['movie-lists', lastMovieListKey]);
  });

  it('should not navigate if the user does not have any lists', () => {
    const router: Router = TestBed.get(Router);
    const service: MovieListsService = TestBed.get(MovieListsService);
    spyOn(router, 'navigate');
    spyOn(service, 'getMovieLists').and.returnValue(of([]));
    component.showMovieLists = true;

    component.ngOnInit();
    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
