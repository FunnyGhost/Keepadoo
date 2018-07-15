import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  scheduleRenewal() {},
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
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
});
