import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthenticationService } from './core/authentication.service';
import { SharedModule } from './shared/shared.module';

const mockAuthService = {
  isAuthenticated$: new BehaviorSubject<boolean>(false),
  handleAuthentication() {},
  login() {},
  logout() {}
};

const mockFirebaseAuthenticationService = {
  auth: {
    signInAnonymously() {}
  }
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authService: AuthenticationService;
  let firebaseAuthService: AngularFireAuth;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, BrowserAnimationsModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthenticationService,
          useValue: mockAuthService
        },
        {
          provide: AngularFireAuth,
          useValue: mockFirebaseAuthenticationService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
    firebaseAuthService = TestBed.get(AngularFireAuth);
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should handle the authentication if it is present', async(() => {
    spyOn(authService, 'handleAuthentication');

    component.ngOnInit();

    expect(authService.handleAuthentication).toHaveBeenCalled();
  }));

  it('should login anonymously on firebase', async(() => {
    spyOn(firebaseAuthService.auth, 'signInAnonymously');

    component.ngOnInit();

    expect(firebaseAuthService.auth.signInAnonymously).toHaveBeenCalled();
  }));

  describe('logged out user', () => {
    beforeEach(() => {
      mockAuthService.isAuthenticated$.next(false);
      fixture.detectChanges();
    });

    it('should show the login button', () => {
      const loginButtons = fixture.debugElement.queryAll(By.css('.login-button'));

      expect(loginButtons.length).toBe(1);
    });

    it('should not show the logout button', () => {
      const loginButtons = fixture.debugElement.queryAll(By.css('.logout-button'));

      expect(loginButtons.length).toBe(0);
    });

    it('should login the user', () => {
      const loginButtons = fixture.debugElement.queryAll(By.css('.login-button'));
      spyOn(authService, 'login');

      loginButtons[0].triggerEventHandler('click', null);

      expect(authService.login).toHaveBeenCalled();
    });

    it('should not show the profile link', () => {
      const logoutButtons = fixture.debugElement.queryAll(By.css('.profile-link'));

      expect(logoutButtons.length).toBe(0);
    });

    it('should not show the movies-lists link', () => {
      const logoutButtons = fixture.debugElement.queryAll(By.css('.movies-lists-link'));

      expect(logoutButtons.length).toBe(0);
    });
  });

  describe('logged in user', () => {
    beforeEach(() => {
      mockAuthService.isAuthenticated$.next(true);
      fixture.detectChanges();
    });

    it('should not show the login button', () => {
      const loginButtons = fixture.debugElement.queryAll(By.css('.login-button'));

      expect(loginButtons.length).toBe(0);
    });

    it('should show the logout button', () => {
      const logoutButtons = fixture.debugElement.queryAll(By.css('.logout-button'));

      expect(logoutButtons.length).toBe(1);
    });

    it('should logout the user', () => {
      const logoutButtons = fixture.debugElement.queryAll(By.css('.logout-button'));
      spyOn(authService, 'logout');

      logoutButtons[0].triggerEventHandler('click', null);

      expect(authService.logout).toHaveBeenCalled();
    });

    it('should show the profile link', () => {
      const logoutButtons = fixture.debugElement.queryAll(By.css('.profile-link'));

      expect(logoutButtons.length).toBe(1);
    });

    it('should show the movies-lists link', () => {
      const logoutButtons = fixture.debugElement.queryAll(By.css('.movies-lists-link'));

      expect(logoutButtons.length).toBe(1);
    });
  });
});
