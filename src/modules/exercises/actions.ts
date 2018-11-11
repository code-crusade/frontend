import { createAsyncAction } from 'typesafe-actions';
import { Exercise, ExerciseSubmission } from '../../__generated__/api';
import { Omit } from '../../types/types';

export const exercisesBrowse = createAsyncAction(
  'EXERCISES_BROWSE_REQUEST',
  'EXERCISES_BROWSE_SUCCESS',
  'EXERCISES_BROWSE_FAILURE',
)<void, Exercise[], Error>();

export const exercisesRead = createAsyncAction(
  'EXERCISES_READ_REQUEST',
  'EXERCISES_READ_SUCCESS',
  'EXERCISES_READ_FAILURE',
)<number, Exercise, Error>();

export const exercisesAdd = createAsyncAction(
  'EXERCISES_ADD_REQUEST',
  'EXERCISES_ADD_SUCCESS',
  'EXERCISES_ADD_FAILURE',
)<Omit<Exercise, 'id'>, Exercise, Error>();

export const exerciseSubmissionsBrowse = createAsyncAction(
  'EXERCISE_SUBMISSIONS_BROWSE_REQUEST',
  'EXERCISE_SUBMISSIONS_BROWSE_SUCCESS',
  'EXERCISE_SUBMISSIONS_BROWSE_FAILURE',
)<number, ExerciseSubmission[], Error>();

export const exerciseSubmissionsRead = createAsyncAction(
  'EXERCISE_SUBMISSIONS_READ_REQUEST',
  'EXERCISE_SUBMISSIONS_READ_SUCCESS',
  'EXERCISE_SUBMISSIONS_READ_FAILURE',
)<number, ExerciseSubmission, Error>();

export const exerciseSubmissionsEdit = createAsyncAction(
  'EXERCISE_SUBMISSIONS_EDIT_REQUEST',
  'EXERCISE_SUBMISSIONS_EDIT_SUCCESS',
  'EXERCISE_SUBMISSIONS_EDIT_FAILURE',
)<ExerciseSubmission, ExerciseSubmission, Error>();

export const exerciseSubmissionsAdd = createAsyncAction(
  'EXERCISE_SUBMISSIONS_ADD_REQUEST',
  'EXERCISE_SUBMISSIONS_ADD_SUCCESS',
  'EXERCISE_SUBMISSIONS_ADD_FAILURE',
)<Omit<ExerciseSubmission, 'id'>, ExerciseSubmission, Error>();
