import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as exercises from '../actions';
import { ExerciseSubmission } from '../models';

export type ExerciseSubmissionsAction = ActionType<typeof exercises>;

export type ExerciseSubmissionsState = Readonly<{
  items: { [key: string]: ExerciseSubmission };
  loading: boolean;
  error: Error | null;
}>;

export const exerciseSubmissionsReducer = combineReducers<
  ExerciseSubmissionsState,
  ExerciseSubmissionsAction
>({
  error: (state = null, action) => {
    switch (action.type) {
      case getType(exercises.exerciseSubmissionsBrowse.request):
      case getType(exercises.exerciseSubmissionsRead.request):
      case getType(exercises.exerciseSubmissionsAdd.request):
      case getType(exercises.exerciseSubmissionsBrowse.success):
      case getType(exercises.exerciseSubmissionsRead.success):
      case getType(exercises.exerciseSubmissionsAdd.success):
        return null;
      case getType(exercises.exerciseSubmissionsBrowse.failure):
      case getType(exercises.exerciseSubmissionsRead.failure):
      case getType(exercises.exerciseSubmissionsAdd.failure):
        return action.payload;

      default:
        return state;
    }
  },
  items: (state = {}, action) => {
    switch (action.type) {
      case getType(exercises.exerciseSubmissionsBrowse.success):
        return {
          ...state,
          ...action.payload.reduce(
            (carry, item) => ({
              ...carry,
              [item.id]: item,
            }),
            {},
          ),
        };

      case getType(exercises.exerciseSubmissionsRead.success):
      case getType(exercises.exerciseSubmissionsAdd.success):
        return { ...state, [action.payload.id]: action.payload };

      default:
        return state;
    }
  },
  loading: (state = false, action) => {
    switch (action.type) {
      case getType(exercises.exerciseSubmissionsBrowse.request):
      case getType(exercises.exerciseSubmissionsRead.request):
      case getType(exercises.exerciseSubmissionsAdd.request):
        return true;

      case getType(exercises.exerciseSubmissionsBrowse.success):
      case getType(exercises.exerciseSubmissionsRead.success):
      case getType(exercises.exerciseSubmissionsAdd.success):
      case getType(exercises.exerciseSubmissionsBrowse.failure):
      case getType(exercises.exerciseSubmissionsRead.failure):
      case getType(exercises.exerciseSubmissionsAdd.failure):
        return false;

      default:
        return state;
    }
  },
});
