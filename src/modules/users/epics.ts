import { combineEpics, Epic } from 'redux-observable';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { Services } from '../../services';
import { RootState } from '../../store/root-reducer';
import { RootAction } from '../../types/actions';
import { usersAdd, usersBrowse, usersRead } from './actions';

// REMEMBER: When an Epic receives an action, it has already been run through your reducers and the state updated.
const usersBrowseFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(usersBrowse.request)),
    switchMap((action) =>
      fromPromise(Api.defaultApi.usersBrowse()).pipe(
        map(usersBrowse.success),
        catchError((err) => of(usersBrowse.failure(err))),
      ),
    ),
  );

const usersReadFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(usersRead.request)),
    switchMap((action) =>
      fromPromise(Api.defaultApi.usersRead(action.payload)).pipe(
        map(usersRead.success),
        catchError((err) => of(usersRead.failure(err))),
      ),
    ),
  );

const usersAddFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(usersAdd.request)),
    switchMap((action) =>
      fromPromise(Api.defaultApi.usersAdd(action.payload)).pipe(
        map(usersAdd.success),
        catchError((err) => of(usersAdd.failure(err))),
      ),
    ),
  );

export const usersEpics = combineEpics(
  usersBrowseFlow,
  usersReadFlow,
  usersAddFlow,
);
