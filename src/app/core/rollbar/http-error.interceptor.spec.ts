import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import * as Rollbar from 'rollbar';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { RollbarService } from './rollbar.service';

const mockRollbarService = {
  error(text: string) {}
};

describe('HttpErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let rollbarService: Rollbar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        },
        { provide: RollbarService, useValue: mockRollbarService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    rollbarService = TestBed.get(RollbarService);
  });

  it('should log if there is an error', () => {
    spyOn(rollbarService, 'error');
    const urlToUse = 'some-url-here';
    httpClient.get(urlToUse).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(urlToUse);
    expect(req.request.method).toEqual('GET');

    req.flush('Something failed', { status: 404, statusText: 'Not Found' });
    expect(rollbarService.error).toHaveBeenCalled();
    httpMock.verify();
  });

  it('should not log if there is no error', () => {
    spyOn(rollbarService, 'error');
    const urlToUse = 'some-url-here';
    httpClient.get(urlToUse).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(urlToUse);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    expect(rollbarService.error).not.toHaveBeenCalled();
    httpMock.verify();
  });
});
