import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { TvShow } from '../../core/models/tv-show';
import { TvShowComponent } from './tv-show.component';

const tvShowToUse: TvShow = {
  key: 'some-key-here',
  name: 'The laughing joke',
  vote_average: 5,
  vote_count: 9999,
  overview: 'Crazinest at its best',
  poster_path: 'some-path-here',
  popularity: 443
};

describe('TvShowComponent', () => {
  let component: TvShowComponent;
  let fixture: ComponentFixture<TvShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, MatIconModule],
      declarations: [TvShowComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowComponent);
    component = fixture.componentInstance;
    component.tvShow = tvShowToUse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when the user wants to delete the tv-show', done => {
    const deleteButton = fixture.debugElement.queryAll(By.css('.delete-button'));
    expect(deleteButton.length).toBe(1);

    component.tvShowDeleted.subscribe((tvShowKey: string) => {
      expect(tvShowKey).toBe(tvShowToUse.key);
      done();
    });

    deleteButton[0].triggerEventHandler('click', null);
  });

  describe('rendering', () => {
    it('should contain the tv-show name', () => {
      expect(fixture.debugElement.nativeElement.innerHTML).toContain(tvShowToUse.name);
    });

    it('should contain the poster image', () => {
      expect(fixture.debugElement.nativeElement.innerHTML).toContain(tvShowToUse.poster_path);
    });
  });
});
