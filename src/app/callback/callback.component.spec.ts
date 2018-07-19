import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { mockRouter } from '../../test-utilities/mocks';
import { AuthenticationService } from '../core/authentication.service';
import { CallbackComponent } from './callback.component';

const mockAuthService = {
  redirectUrl: 'some-url-here'
};

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CallbackComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: AuthenticationService,
          useValue: mockAuthService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    mockRouter.navigateByUrl.calls.reset();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should redirect if there is a redirect url', () => {
    fixture.detectChanges();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(mockAuthService.redirectUrl);
  });

  it('should not redirect if there is no redirect url', () => {
    const authService = TestBed.get(AuthenticationService);
    authService.redirectUrl = '';

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });
});
