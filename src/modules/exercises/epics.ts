import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { Services } from '../../services';
import { RootState } from '../../store/root-reducer';
import { RootAction } from '../../types/actions';
import { exercisesAdd, exercisesBrowse } from './actions';

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
        map(({ response }) => response.data._embedded.exercices),
        map(exercisesBrowse.success),
        catchError((err) => of(exercisesBrowse.failure(err))),
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
        map(({ response }) => response.data._embedded.exercice),
        map(exercisesAdd.success),
        catchError((err) => of(exercisesBrowse.failure(err))),
      ),
    ),
  );

export const exercisesEpics = combineEpics(
  exercisesBrowseFlow,
  exercisesAddFlow,
);
