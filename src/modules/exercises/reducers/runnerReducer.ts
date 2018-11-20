import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { CodeValidationReport } from '../../../__generated__/api';
import * as exercises from '../actions';

export type RunnerAction = ActionType<typeof exercises>;

export type RunnerState = Readonly<{
  codeValidationReport: CodeValidationReport | null;
  loading: boolean;
  error: Error | null;
}>;

export const runnerReducer = combineReducers<RunnerState, RunnerAction>({
  error: (state = null, action) => {
    switch (action.type) {
      case getType(exercises.exercisesTestCode.failure):
        return action.payload;

      default:
        return state;
    }
  },
  codeValidationReport: (state = null, action) => {
    switch (action.type) {
      case getType(exercises.exercisesTestCode.success):
        return action.payload;

      case getType(exercises.exercisesTestCode.request):
        return null;

      default:
        return state;
    }
  },
  loading: (state = false, action) => {
    switch (action.type) {
      case getType(exercises.exercisesTestCode.request):
        return true;

      case getType(exercises.exercisesTestCode.success):
      case getType(exercises.exercisesTestCode.failure):
        return false;

      default:
        return state;
    }
  },
});
