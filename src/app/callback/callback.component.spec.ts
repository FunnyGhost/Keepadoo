import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../core/authentication.service';
import { CallbackComponent } from './callback.component';

const mockAuthService = {
  continueFromWhereYouLeftOff() {}
};

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CallbackComponent],
      providers: [
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue from where the user left off before login', () => {
    const authService: AuthenticationService = TestBed.get(AuthenticationService);
    spyOn(authService, 'continueFromWhereYouLeftOff');

    component.ngAfterViewInit();

    expect(authService.continueFromWhereYouLeftOff).toHaveBeenCalled();
  });
});
