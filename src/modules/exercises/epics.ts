import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { Services } from '../../services';
import { RootState } from '../../store/root-reducer';
import { RootAction } from '../../types/actions';
import {
  exercisesAdd,
  exercisesBrowse,
  exercisesRead,
  exerciseSubmissionsAdd,
  exerciseSubmissionsBrowse,
} from './actions';

// REMEMBER: When an Epic receives an action, it has already been run through your reducers and the state updated.
const exercisesBrowseFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(exercisesBrowse.request)),
    switchMap((action) =>
      Api.exercises.browse({}).pipe(
        map(({ response }) => response.data._embedded.exercises),
        map(exercisesBrowse.success),
        catchError((err) => of(exercisesBrowse.failure(err))),
      ),
    ),
  );

const exercisesReadFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(exercisesRead.request)),
    switchMap((action) =>
      Api.exercises.read(action.payload).pipe(
        map(({ response }) => response.data._embedded.exercises),
        map(exercisesRead.success),
        catchError((err) => of(exercisesRead.failure(err))),
      ),
    ),
  );

const exercisesAddFlow: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  store,
  { Api },
) =>
  action$.pipe(
    filter(isActionOf(exercisesAdd.request)),
    switchMap((action) =>
      from(Api.exercises.add(action.payload)).pipe(
        map(({ response }) => response.data._embedded.exercise),
        map(exercisesAdd.success),
        catchError((err) => of(exercisesAdd.failure(err))),
      ),
    ),
  );

const exerciseSubmissionsBrowseFlow: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, store, { Api }) =>
  action$.pipe(
    filter(isActionOf(exerciseSubmissionsBrowse.request)),
    switchMap((action) =>
      Api.exerciseSubmissions.browse({}).pipe(
        map(({ response }) => {
          console.log(response);
          return response.data._embedded.exerciseSubmissions;
        }),
        map(exerciseSubmissionsBrowse.success),
        catchError((err) => of(exerciseSubmissionsBrowse.failure(err))),
      ),
    ),
  );

const exerciseSubmissionsAddFlow: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, store, { Api }) =>
  action$.pipe(
    filter(isActionOf(exerciseSubmissionsAdd.request)),
    switchMap((action) =>
      from(Api.exerciseSubmissions.add(action.payload)).pipe(
        map(({ response }) => response.data._embedded.exercise),
        map(exerciseSubmissionsAdd.success),
        catchError((err) => of(exerciseSubmissionsAdd.failure(err))),
      ),
    ),
  );

export const exercisesEpics = combineEpics(
  exerciseSubmissionsBrowseFlow,
  exerciseSubmissionsAddFlow,
  exercisesBrowseFlow,
  exercisesReadFlow,
  exercisesAddFlow,
);
