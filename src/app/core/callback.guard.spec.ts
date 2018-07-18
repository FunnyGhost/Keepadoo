import { inject, TestBed } from '@angular/core/testing';
import { Router } from '../../../node_modules/@angular/router';
import { mockRouter } from '../../test-utilities/mocks';
import { AuthenticationService } from './authentication.service';
import { CallbackGuard } from './callback.guard';

const mockAuthService = {
  redirectUrl: 'some-redirect-url-here'
};

describe('CallbackGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CallbackGuard,
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: AuthenticationService,
          useValue: mockAuthService
        }
      ]
    });
  });

  it('should be created', inject([CallbackGuard], (guard: CallbackGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should redirect the user to where he left off', inject(
    [CallbackGuard],
    (guard: CallbackGuard) => {
      guard.canActivate(null, null);

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(mockAuthService.redirectUrl);
    }
  ));
});
