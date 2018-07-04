import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TvShowService } from 'src/app/tv-show-lists/core/tv-show.service';
import { MockActivatedRoute, mockModalService } from '../../../test-utilities/mocks';
import { ModalService } from '../../core/modal.service';
import { TMDBService } from '../../core/tmdb.service';
import { SharedModule } from '../../shared/shared.module';
import { TvShowSearchResult } from '../core/models/tv-show-search-result';
import { TvShowListsService } from '../core/tv-show-lists.service';
import { TvShowListsSharedModule } from '../shared/tv-show-lists-shared.module';
import { TvShowListComponent } from './tv-show-list.component';

const mockTvShowService = {
  getTvShowsInList(listId: string) {
    return of([]);
  },
  addTvShowToList(listId: string, tvShow: TvShowSearchResult) {},
  deleteTvShowFromList(listId: string, tvShowKey: string) {}
};

const mockTvShowListService = {
  deleteTvShowList(listId: string) {
    return of({});
  }
};

const mockTMDBService = {
  searchTvShows(text: string) {
    return of([]);
  }
};

fdescribe('TvShowListComponent', () => {
  let component: TvShowListComponent;
  let fixture: ComponentFixture<TvShowListComponent>;

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
        TvShowListsSharedModule,
        SharedModule
      ],
      declarations: [TvShowListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        },
        {
          provide: TvShowService,
          useValue: mockTvShowService
        },
        {
          provide: TvShowListsService,
          useValue: mockTvShowListService
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
    fixture = TestBed.createComponent(TvShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list based on the :id in the url', () => {
    const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
    const tvShowService: TvShowService = TestBed.get(TvShowService);

    const listIdToUse = 'some-list-id';
    activatedRoute.setNewReturn(listIdToUse);
    spyOn(tvShowService, 'getTvShowsInList').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(tvShowService.getTvShowsInList).toHaveBeenCalledWith(listIdToUse);
  });

  it('should delete the list if the user confirms in the modal', () => {
    const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
    const tvShowListsService: TvShowListsService = TestBed.get(TvShowListsService);
    const modalService: ModalService = TestBed.get(ModalService);

    const listIdToUse = 'some-list-id';
    activatedRoute.setNewReturn(listIdToUse);
    spyOn(tvShowListsService, 'deleteTvShowList').and.callThrough();
    spyOn(modalService, 'openModal').and.returnValue(of(true));

    component.ngOnInit();
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.queryAll(By.css('.delete-button'));
    expect(deleteButton.length).toBe(1);

    deleteButton[0].triggerEventHandler('click', null);

    expect(tvShowListsService.deleteTvShowList).toHaveBeenCalledWith(listIdToUse);
  });

  it('should not delete the list if the user does not confirm in the modal', () => {
    const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
    const tvShowListsService: TvShowListsService = TestBed.get(TvShowListsService);
    const modalService: ModalService = TestBed.get(ModalService);

    const listIdToUse = 'some-list-id';
    activatedRoute.setNewReturn(listIdToUse);
    spyOn(tvShowListsService, 'deleteTvShowList').and.callThrough();
    spyOn(modalService, 'openModal').and.returnValue(of(undefined));

    component.ngOnInit();
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.queryAll(By.css('.delete-button'));
    expect(deleteButton.length).toBe(1);

    deleteButton[0].triggerEventHandler('click', null);

    expect(tvShowListsService.deleteTvShowList).not.toHaveBeenCalledWith(listIdToUse);
  });

  it('should delete the tv-show when the event is emitted', () => {
    const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
    const tvShowService: TvShowService = TestBed.get(TvShowService);

    const listIdToUse = 'some-list-id';
    activatedRoute.setNewReturn(listIdToUse);
    spyOn(tvShowService, 'getTvShowsInList').and.callThrough();
    spyOn(tvShowService, 'deleteTvShowFromList');

    component.ngOnInit();
    fixture.detectChanges();

    const tvShowToDeleteKey = 'some-tv-show-key-here';
    component.deleteTvShow(tvShowToDeleteKey);

    expect(tvShowService.deleteTvShowFromList).toHaveBeenCalledWith(listIdToUse, tvShowToDeleteKey);
  });

  describe('search', () => {
    it('should display an empty string', () => {
      expect(component.searchDisplayFunction({ name: 'Thor' } as TvShowSearchResult)).toBe('');
      expect(component.searchDisplayFunction(undefined)).toBe('');
    });

    it('should add the selected tv-show to the current list', () => {
      const activatedRoute: MockActivatedRoute = TestBed.get(ActivatedRoute);
      const tvShowService: TvShowService = TestBed.get(TvShowService);
      const selectedTvShow = { title: 'Thor' };
      const listIdToUse = 'some-list-id';
      activatedRoute.setNewReturn(listIdToUse);

      component.ngOnInit();
      fixture.detectChanges();

      spyOn(tvShowService, 'addTvShowToList');

      component.searchResultSelected({
        option: { value: selectedTvShow }
      } as MatAutocompleteSelectedEvent);

      expect(tvShowService.addTvShowToList).toHaveBeenCalledWith(listIdToUse, selectedTvShow);
    });
  });
});
