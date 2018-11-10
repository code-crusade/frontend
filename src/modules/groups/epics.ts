import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { Services } from 'src/services';
import { RootState } from 'src/store/root-reducer';
import { RootAction } from 'src/types/actions';
import { isActionOf } from 'typesafe-actions';
import { groupsAdd, groupsArchive, groupsBrowse } from './actions';

const groupsBrowseFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(groupsBrowse.request)),
    switchMap((action) =>
      Api.groups.browse().pipe(
        map(({ response }) => response.data._embedded.groups),
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
      from(Api.groups.add(action.payload)).pipe(
        map(({ response }) => response.data._embedded.group),
        map(groupsAdd.success),
        catchError((err) => of(groupsAdd.failure(err))),
      ),
    ),
  );

const groupsArchiveFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(groupsArchive.request)),
    switchMap((action) =>
      from(Api.groups.archive(action.payload)).pipe(
        map(({ response }) => response.data._embedded.group),
        map(groupsArchive.success),
        catchError((err) => of(groupsArchive.failure(err))),
      ),
    ),
  );

export const groupsEpics = combineEpics(
  groupsAddFlow,
  groupsBrowseFlow,
  groupsArchiveFlow,
);
