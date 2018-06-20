import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../core/models/user';
import { UserService } from '../../core/user.service';
import { ProfileComponent } from './profile.component';

const userToUse: Partial<User> = {
  name: 'batman@batcave.com'
};

const mockUserService = {
  userProfile$: new BehaviorSubject<User>(userToUse as User)
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the user name', () => {
    const userNames = fixture.debugElement.queryAll(By.css('.user-name'));

    expect(userNames.length).toBe(1);
    expect(userNames[0].nativeElement.textContent).toContain(userToUse.name);
  });
});
