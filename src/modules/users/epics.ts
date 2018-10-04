import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
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
      Api.users.browse({}).pipe(
        map(({ response }) => response.data._embedded.users),
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
      Api.users.read(action.payload).pipe(
        map(({ response }) => response.data._embedded.users),
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
      from(Api.users.add(action.payload)).pipe(
        map(({ response }) => response.data._embedded.user),
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
