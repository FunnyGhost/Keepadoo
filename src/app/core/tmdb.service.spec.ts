import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MovieSearchResult } from 'src/app/movie-list/core/models/movie-search-result';
import { environment } from '../../environments/environment';
import { TvShowSearchResult } from '../tv-show-lists/core/models/tv-show-search-result';
import { TMDBService } from './tmdb.service';

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

  it('should filter movie search results without a poster from tmdb', done => {
    inject([TMDBService], (service: TMDBService) => {
      const searchText = 'Thor';
      const dataToReturn = {
        results: [
          {
            title: 'Thor',
            overview: 'Something about a greek god..',
            poster_path: 'thor-poster'
          } as MovieSearchResult,
          {
            title: 'Iron man',
            overview: 'Something about a dude with an iron suit..',
            poster_path: 'iron-man-poster'
          } as MovieSearchResult,
          {
            title: 'Chinese Iron Man',
            overview: 'Something about a chinese dude with an iron suit..',
            poster_path: ''
          } as MovieSearchResult
        ]
      };

      service.searchMovies(searchText).subscribe((searchResults: MovieSearchResult[]) => {
        expect(searchResults).toEqual([dataToReturn.results[0], dataToReturn.results[1]]);
        done();
      });

      const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
        const containsUrl = request.url.includes(environment.tmdbConfig.apiUrl);
        const containsKey = request.params.get('api_key') === environment.tmdbConfig.api_key;
        const containesSearchQuery = request.params.get('query') === searchText;
        return containsUrl && containsKey && containesSearchQuery;
      });

      expect(req.request.method).toEqual('GET');

      req.flush(dataToReturn);

      httpTestingController.verify();
    })();
  });

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

  it('should filter tv search results without a poster from tmdb', done => {
    inject([TMDBService], (service: TMDBService) => {
      const searchText = 'Vikings';
      const dataToReturn = {
        results: [
          {
            name: 'Vikings',
            overview: 'Something about vikings..',
            poster_path: 'vikings-poster'
          } as TvShowSearchResult,
          {
            name: 'Preacher',
            overview: 'Something about a dude with a voice..',
            poster_path: 'preacher-poster'
          } as TvShowSearchResult,
          {
            name: 'Tzu-thing-chang',
            overview: 'Something chinese...',
            poster_path: ''
          } as TvShowSearchResult
        ]
      };

      service.searchTvShows(searchText).subscribe((data: TvShowSearchResult[]) => {
        expect(data).toEqual([dataToReturn.results[0], dataToReturn.results[1]]);
        done();
      });

      const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
        const containsUrl = request.url.includes(environment.tmdbConfig.apiUrl);
        const containsKey = request.params.get('api_key') === environment.tmdbConfig.api_key;
        const containesSearchQuery = request.params.get('query') === searchText;
        return containsUrl && containsKey && containesSearchQuery;
      });

      expect(req.request.method).toEqual('GET');

      req.flush(dataToReturn);

      httpTestingController.verify();
    })();
  });
});
