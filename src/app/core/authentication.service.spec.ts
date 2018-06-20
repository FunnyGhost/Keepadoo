import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { mockRouter } from '../../test-utilities/mocks';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });
  });

  beforeEach(() => {
    localStorage.removeItem('access_token');
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  describe('on logout', () => {
    it('should remove data', inject([AuthenticationService], (service: AuthenticationService) => {
      localStorage.setItem('access_token', 'some-token-here');
      localStorage.setItem('id_token', 'some-other-token-here');
      localStorage.setItem('expires_at', 'now');

      service.logout();

      expect(localStorage.getItem('acces_token')).toBe(null);
      expect(localStorage.getItem('id_token')).toBe(null);
      expect(localStorage.getItem('expires_at')).toBe(null);
    }));

    it('should navigate to home', inject(
      [AuthenticationService, Router],
      (service: AuthenticationService, router: Router) => {
        (router.navigate as jasmine.Spy).calls.reset();

        service.logout();

        expect(router.navigate).toHaveBeenCalledWith(['/']);
      }
    ));

    it('should broadcast that the user is not authenticated', inject(
      [AuthenticationService],
      (service: AuthenticationService) => {
        let isInitialValue = true;
        service.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
          if (isInitialValue) {
            // ignore initial value
            isInitialValue = false;
          } else {
            expect(isAuthenticated).toBe(false);
          }
        });

        service.logout();
      }
    ));
  });

  describe('isAuthenticated$ for logged out user', () => {
    beforeEach(() => {
      localStorage.removeItem('expires_at');
    });

    it('should be false', inject([AuthenticationService], (service: AuthenticationService) => {
      service.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
        expect(isAuthenticated).toBe(false);
      });
    }));
  });

  describe('isAuthenticated$ for user with expired cookie', () => {
    beforeEach(() => {
      localStorage.setItem('expires_at', '1');
    });

    it('should be false', inject([AuthenticationService], (service: AuthenticationService) => {
      service.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
        expect(isAuthenticated).toBe(false);
      });
    }));
  });

  describe('isAuthenticated$ for logged in user', () => {
    beforeEach(() => {
      localStorage.setItem('expires_at', '9999999999999999999');
    });

    it('should be true', inject([AuthenticationService], (service: AuthenticationService) => {
      service.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
        expect(isAuthenticated).toBe(true);
      });
    }));
  });
});
