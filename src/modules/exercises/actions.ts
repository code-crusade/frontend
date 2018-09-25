import { createAsyncAction } from 'typesafe-actions';
import { Exercise } from './models';

export const exercisesBrowse = createAsyncAction(
  'EXERCISES_BROWSE_REQUEST',
  'EXERCISES_BROWSE_SUCCESS',
  'EXERCISES_BROWSE_FAILURE',
)<void, Exercise[], Error>();

export const exercisesRead = createAsyncAction(
  'EXERCISES_READ_REQUEST',
  'EXERCISES_READ_SUCCESS',
  'EXERCISES_READ_FAILURE',
)<string, Exercise, Error>();

export const exercisesAdd = createAsyncAction(
  'EXERCISES_ADD_REQUEST',
  'EXERCISES_ADD_SUCCESS',
  'EXERCISES_ADD_FAILURE',
)<Exercise, Exercise, Error>();
