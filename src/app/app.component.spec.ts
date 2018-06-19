import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mockRouter } from 'src/test-utilities/mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('logged out user', () => {
    it('should show the login button', () => {});
    it('should not show the logout button', () => {});
    it('should login the user', () => {});
  });

  describe('logged in user', () => {
    it('should not show the login button', () => {});
    it('should show the logout button', () => {});
    it('should logout the user', () => {});
  });
});
