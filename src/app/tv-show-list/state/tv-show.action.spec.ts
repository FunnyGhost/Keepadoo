import { DisplayMode } from '../core/models/enums';
import { TvShow } from '../core/models/tv-show';
import { TvShowList } from '../core/models/tv-show-list';
import { TvShowSearchResult } from '../core/models/tv-show-search-result';
import * as fromTvShow from './tv-show.action';

describe('TvShow Actions', () => {
    describe('TvShowList', () => {
        describe('ChangeListDisplayMode', () => {
            it('should create an action', () => {
                const payload = DisplayMode.Grid;
                const action = new fromTvShow.ChangeListDisplayMode(payload);

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.ChangeListDisplayMode,
                    payload
                });
            });
        });
        describe('SelectTvShowList', () => {
            it('should create an action', () => {
                const payload: TvShowList = {key: '1234', name: 'To see', userId: '5454'};
                const action = new fromTvShow.SelectTvShowList(payload);

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.SelectTvShowList,
                    payload
                });
            });
        });
    });
    describe('TvShows', () => {
        describe('LoadTvShowsInList', () => {
            it('should create an action', () => {
                const action = new fromTvShow.LoadTvShowsInList();

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.LoadTvShowsInList,
                });
            });
        });
        describe('LoadTvShowsInListFailed', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromTvShow.LoadTvShowsInListFailed(payload);

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.LoadTvShowsInListFailed,
                    payload
                });
            });
        });
        describe('LoadTvShowsInListSuccess', () => {
            it('should create an action', () => {
                const payload: TvShow[] = [
                    {
                        id: 123,
                        name: 'Gotham'
                    } as TvShow
                ];
                const action = new fromTvShow.LoadTvShowsInListSuccess(payload);

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.LoadTvShowsInListSuccess,
                    payload
                });
            });
        });
        describe('AddTvShowToCurrentList', () => {
            it('should create an action', () => {
                const payload: TvShowSearchResult =
                    {
                        id: 123,
                        name: 'Gotham'
                    } as TvShowSearchResult;
                const action = new fromTvShow.AddTvShowToCurrentList(payload);

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.AddTvShowToCurrentList,
                    payload
                });
            });
        });
        describe('AddTvShowToCurrentListFailed', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromTvShow.AddTvShowToCurrentListFailed(payload);

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.AddTvShowToCurrentListFailed,
                    payload
                });
            });
        });
        describe('AddTvShowToCurrentListSuccess', () => {
            it('should create an action', () => {
                const action = new fromTvShow.AddTvShowToCurrentListSuccess();

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.AddTvShowToCurrentListSuccess,
                });
            });
        });
        describe('RemoveTvShowFromCurrentList', () => {
            it('should create an action', () => {
                const payload: TvShow =
                    {
                        id: 123,
                        name: 'Gotham'
                    } as TvShow;
                const action = new fromTvShow.RemoveTvShowFromCurrentList(payload);

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.RemoveTvShowFromCurrentList,
                    payload
                });
            });
        });
        describe('RemoveTvShowFromCurrentListFailed', () => {
            it('should create an action', () => {
                const payload = 'You failed!';
                const action = new fromTvShow.RemoveTvShowFromCurrentListFailed(payload);

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.RemoveTvShowFromCurrentListFailed,
                    payload
                });
            });
        });
        describe('RemoveTvShowFromCurrentListSuccess', () => {
            it('should create an action', () => {
                const payload: TvShow =
                    {
                        id: 123,
                        name: 'Gotham'
                    } as TvShow;
                const action = new fromTvShow.RemoveTvShowFromCurrentListSuccess(payload);

                expect(action).toEqual({
                    type: fromTvShow.TvShowActionTypes.RemoveTvShowFromCurrentListSuccess,
                    payload
                });
            });
        });
    });
});
