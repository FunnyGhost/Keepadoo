import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieSearchResult } from 'src/app/movie-list/core/models/movie-search-result';
import { environment } from '../../environments/environment';
import { TvShowSearchResult } from '../tv-show-lists/core/models/tv-show-search-result';

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
      })
    );
  }
}