import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

class MockAuthenticationService {
  private _isAuthenticated$ = new BehaviorSubject<boolean>(true);
  get isAuthenticated$() {
    return this._isAuthenticated$;
  }

  login() {}
}

const mockRouterStateSnapshot = {
  url: 'some-url-here'
} as RouterStateSnapshot;

describe('AuthenticationGuard', () => {
  let authService: MockAuthenticationService;
  let guard: AuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }
      ]
    });

    authService = TestBed.get(AuthenticationService);
    guard = TestBed.get(AuthenticationGuard);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authenticated', done => {
    authService.isAuthenticated$.next(true);

    guard.canActivate(null, mockRouterStateSnapshot).subscribe((canAccess: boolean) => {
      expect(canAccess).toBe(true);
      done();
    });
  });

  it('should return false if user is not authenticated', done => {
    authService.isAuthenticated$.next(false);

    guard.canActivate(null, mockRouterStateSnapshot).subscribe((canAccess: boolean) => {
      expect(canAccess).toBe(false);
      done();
    });
  });

  it('should login the user if he/she is not authenticated', done => {
    authService.isAuthenticated$.next(false);
    spyOn(authService, 'login');

    guard.canActivate(null, mockRouterStateSnapshot).subscribe((canAccess: boolean) => {
      expect(authService.login).toHaveBeenCalledWith(mockRouterStateSnapshot.url);
      done();
    });
  });
});
