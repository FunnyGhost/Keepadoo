import { User } from '../core/models/user';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
import { MovieList } from '../movie-list/core/models/movie-list';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';
import * as fromUser from './user.action';

describe('User Actions', () => {
    describe('CurrentUser', () => {
        describe('SetCurrentUser', () => {
            it('should create an action', () => {
                const payload: User = {email: 'batman@dc.com', userId: '1234'};
                const action = new fromUser.SetCurrentUser(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.SetCurrentUser,
                    payload
                });
            });
        });
        describe('ClearCurrentUser', () => {
            it('should create an action', () => {
                const action = new fromUser.ClearCurrentUser();

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.ClearCurrentUser,
                });
            });
        });
        describe('SetUserMessage', () => {
            it('should create an action', () => {
                const payload = 'I am batman!';
                const action = new fromUser.SetUserMessage(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.SetUserMessage,
                    payload
                });
            });
        });
        describe('ClearUserMessage', () => {
            it('should create an action', () => {
                const action = new fromUser.ClearUserMessage();

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.ClearUserMessage,
                });
            });
        });
    });

    describe('MovieLists', () => {
        describe('LoadMovieLists', () => {
            it('should create an action', () => {
                const action = new fromUser.LoadMovieLists();

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.LoadMovieLists,
                });
            });
        });
        describe('LoadFailed', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromUser.LoadFailed(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.LoadMovieListsFailed,
                    payload
                });
            });
        });
        describe('LoadMovieListsSuccess', () => {
            it('should create an action', () => {
                const payload: MovieList[] = [
                    {
                        key: 'list1',
                        name: 'Favorite movies',
                        userId: '1234'
                    }
                ];
                const action = new fromUser.LoadMovieListsSuccess(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.LoadMovieListsSuccess,
                    payload
                });
            });
        });
        describe('LoadDiscoverMovies', () => {
            it('should create an action', () => {
                const action = new fromUser.LoadDiscoverMovies();

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.LoadDiscoverMovies,
                });
            });
        });
        describe('LoadDiscoverMoviesSuccess', () => {
            it('should create an action', () => {
                const payload: MovieDiscover[] = [
                    {
                        id: 1234,
                        title: 'Batman Begins'
                    } as MovieDiscover
                ];
                const action = new fromUser.LoadDiscoverMoviesSuccess(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.LoadDiscoverMoviesSuccess,
                    payload
                });
            });
        });
        describe('ClearMovieLists', () => {
            it('should create an action', () => {
                const action = new fromUser.ClearMovieLists();

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.ClearMovieLists,
                });
            });
        });
        describe('AddMovieList', () => {
            it('should create an action', () => {
                const payload: MovieList = {
                        key: 'list1',
                        name: 'Favorite movies',
                        userId: '1234'
                    };
                const action = new fromUser.AddMovieList(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.AddMovieList,
                    payload
                });
            });
        });
        describe('AddMovieListSuccess', () => {
            it('should create an action', () => {
                const action = new fromUser.AddMovieListSuccess();

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.AddMovieListSuccess,
                });
            });
        });
        describe('AddMovieListFailed', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromUser.AddMovieListFailed(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.AddMovieListFailed,
                    payload
                });
            });
        });
        describe('DeleteMovieList', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromUser.DeleteMovieList(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.DeleteMovieList,
                    payload
                });
            });
        });
        describe('DeleteMovieListSuccess', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromUser.DeleteMovieListSuccess(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.DeleteMovieListSuccess,
                    payload
                });
            });
        });
        describe('DeleteMovieListFailed', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromUser.DeleteMovieListFailed(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.DeleteMovieListFailed,
                    payload
                });
            });
        });
    });

    describe('TvShowLists', () => {
        describe('LoadTvShowLists', () => {
            it('should create an action', () => {
                const action = new fromUser.LoadTvShowLists();

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.LoadTvShowLists,
                });
            });
        });
        describe('LoadTvShowListsSuccess', () => {
            it('should create an action', () => {
                const payload: TvShowList[] = [
                    {
                        key: 'list1',
                        name: 'Favorite movies',
                        userId: '1234'
                    }
                ];
                const action = new fromUser.LoadTvShowListsSuccess(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.LoadTvShowListsSuccess,
                    payload
                });
            });
        });
        describe('ClearTvShowLists', () => {
            it('should create an action', () => {
                const action = new fromUser.ClearTvShowLists();

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.ClearTvShowLists,
                });
            });
        });
        describe('AddTvShowList', () => {
            it('should create an action', () => {
                const payload: TvShowList = {
                        key: 'list1',
                        name: 'Favorite movies',
                        userId: '1234'
                    };
                const action = new fromUser.AddTvShowList(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.AddTvShowList,
                    payload
                });
            });
        });
        describe('AddTvShowListSuccess', () => {
            it('should create an action', () => {
                const action = new fromUser.AddTvShowListSuccess();

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.AddTvShowListSuccess,
                });
            });
        });
        describe('AddTvShowListFailed', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromUser.AddTvShowListFailed(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.AddTvShowListFailed,
                    payload
                });
            });
        });
        describe('DeleteTvShowList', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromUser.DeleteTvShowList(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.DeleteTvShowList,
                    payload
                });
            });
        });
        describe('DeleteTvShowListSuccess', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromUser.DeleteTvShowListSuccess(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.DeleteTvShowListSuccess,
                    payload
                });
            });
        });
        describe('DeleteTvShowListFailed', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromUser.DeleteTvShowListFailed(payload);

                expect(action).toEqual({
                    type: fromUser.UserActionTypes.DeleteTvShowListFailed,
                    payload
                });
            });
        });
    });

    describe('SetRedirectUrl', () => {
        it('should create an action', () => {
            const payload = '/movie-lists';
            const action = new fromUser.SetRedirectUrl(payload);

            expect(action).toEqual({
                type: fromUser.UserActionTypes.SetRedirectUrl,
                payload
            });
        });
    });
});
