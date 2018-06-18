import { MovieListModule } from './movie-list.module';

describe('MovieListModule', () => {
  let movieListModule: MovieListModule;

  beforeEach(() => {
    movieListModule = new MovieListModule();
  });

  it('should create an instance', () => {
    expect(movieListModule).toBeTruthy();
  });
});
