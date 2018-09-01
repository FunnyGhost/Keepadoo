import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
import { MovieSearchResult } from '../movie-list/core/models/movie-search-result';
import { TvShowSearchResult } from '../tv-show-list/core/models/tv-show-search-result';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {
  constructor(private httpClient: HttpClient) {}

  searchMovies(text: string): Observable<MovieSearchResult[]> {
    const urlToUse = `${environment.tmdbConfig.apiUrl}/search/movie`;
    const params = new HttpParams()
      .set('api_key', environment.tmdbConfig.api_key)
      .set('query', text);

    return this.httpClient.get(urlToUse, { params }).pipe(
      map((response: any) => {
        return response.results as MovieSearchResult[];
      }),
      map((data: MovieSearchResult[]) => {
        return data.filter((movieSearchResult: MovieSearchResult) => {
          return !!movieSearchResult.poster_path;
        });
      })
    );
  }

  discoverMovies(): Observable<MovieDiscover[]> {
    const urlToUse = `${environment.tmdbConfig.apiUrl}/discover/movie`;
    const params = new HttpParams()
      .set('api_key', environment.tmdbConfig.api_key)
      .set('include_adult', 'false')
      .set('include_video', 'false')
      .set('page', '1')
      .set('sort_by', 'popularity.desc');

    return this.httpClient.get(urlToUse, { params }).pipe(
      map((response: any) => {
        return response.results as MovieDiscover[];
      }),
      map((data: MovieDiscover[]) => {
        return data.filter((movieSearchResult: MovieDiscover) => {
          return !!movieSearchResult.poster_path;
        });
      })
    );
  }

  searchTvShows(text: string): Observable<TvShowSearchResult[]> {
    const urlToUse = `${environment.tmdbConfig.apiUrl}/search/tv`;
    const params = new HttpParams()
      .set('api_key', environment.tmdbConfig.api_key)
      .set('query', text);

    return this.httpClient.get(urlToUse, { params }).pipe(
      map((response: any) => {
        return response.results as TvShowSearchResult[];
      }),
      map((data: TvShowSearchResult[]) => {
        return data.filter((tvShowSearchResult: TvShowSearchResult) => {
          return !!tvShowSearchResult.poster_path;
        });
      })
    );
  }
}
