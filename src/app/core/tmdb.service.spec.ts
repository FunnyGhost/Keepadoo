import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { TMDBService } from './tmdb.service';
import { MovieSearchResult } from 'src/app/movie-list/core/models/movie-search-result';

describe('TMDBService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TMDBService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([TMDBService], (service: TMDBService) => {
    expect(service).toBeTruthy();
  }));

  it('should get movie search results from tmdb', inject([TMDBService], (service: TMDBService) => {
    const searchText = 'Thor';
    const dataToReturn = {
      results: [
        {
          title: 'Thor',
          overview: 'Something about a greek god..'
        } as MovieSearchResult,
        {
          title: 'Iron man',
          overview: 'Something about a dude with an iron suit..'
        } as MovieSearchResult
      ]
    };

    service.searchMovies(searchText).subscribe();

    const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
      const containsUrl = request.url.includes(environment.tmdbConfig.apiUrl);
      const containsKey = request.params.get('api_key') === environment.tmdbConfig.api_key;
      const containesSearchQuery = request.params.get('query') === searchText;
      return containsUrl && containsKey && containesSearchQuery;
    });

    expect(req.request.method).toEqual('GET');

    req.flush(dataToReturn);

    httpTestingController.verify();
  }));

  it('should get tv search results from tmdb', inject([TMDBService], (service: TMDBService) => {
    const searchText = 'Vikings';
    const dataToReturn = {
      results: [
        { title: 'Vikings', overview: 'Something about vikings..' },
        {
          title: 'Preacher',
          overview: 'Something about a dude with a voice..'
        }
      ]
    };

    service.searchTvShows(searchText).subscribe();

    const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
      const containsUrl = request.url.includes(environment.tmdbConfig.apiUrl);
      const containsKey = request.params.get('api_key') === environment.tmdbConfig.api_key;
      const containesSearchQuery = request.params.get('query') === searchText;
      return containsUrl && containsKey && containesSearchQuery;
    });

    expect(req.request.method).toEqual('GET');

    req.flush(dataToReturn);

    httpTestingController.verify();
  }));
});
