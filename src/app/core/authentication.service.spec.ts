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
  });

  describe('isAuthenticated', () => {
    it('should be true if token is still valid', inject(
      [AuthenticationService],
      (service: AuthenticationService) => {
        localStorage.setItem('expires_at', '9999999999999');

        const result = service.isAuthenticated();
        expect(result).toBe(true);
      }
    ));
    it('should be false if token is expired', inject(
      [AuthenticationService],
      (service: AuthenticationService) => {
        localStorage.setItem('expires_at', '1');

        const result = service.isAuthenticated();
        expect(result).toBe(false);
      }
    ));
    it('should be false if token is not present', inject(
      [AuthenticationService],
      (service: AuthenticationService) => {
        localStorage.removeItem('expires_at');

        const result = service.isAuthenticated();
        expect(result).toBe(false);
      }
    ));
  });
});
