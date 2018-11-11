import { combineEpics, Epic } from 'redux-observable';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { Services } from 'src/services';
import { RootState } from 'src/store/root-reducer';
import { RootAction } from 'src/types/actions';
import { isActionOf } from 'typesafe-actions';
import { groupsAdd, groupsBrowse } from './actions';

const GroupsBrowseFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(groupsBrowse.request)),
    switchMap((action) =>
      fromPromise(Api.defaultApi.groupsBrowse()).pipe(
        map(groupsBrowse.success),
        catchError((err) => of(groupsBrowse.failure(err))),
      ),
    ),
  );

const groupsAddFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(groupsAdd.request)),
    switchMap((action) =>
      fromPromise(Api.defaultApi.groupsAdd(action.payload)).pipe(
        map(groupsAdd.success),
        catchError((err) => of(groupsAdd.failure(err))),
      ),
    ),
  );

export const groupsEpics = combineEpics(groupsAddFlow, GroupsBrowseFlow);
