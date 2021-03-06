// PRO-TIP: I recommend to create a RootAction in the central point of your redux
// store - it will model a complete representation of all possible action types
// in your application. You can even merge it with existing third-party
// declarations as shown below. (https://github.com/piotrwitek/typesafe-actions)

import { LocationChangeAction, RouterAction } from 'connected-react-router';
import { ExercisesAction } from '../modules/exercises';
import { GroupsAction } from '../modules/groups';
import { UsersAction } from '../modules/users';

type ConnectedReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | ConnectedReactRouterAction
  | ExercisesAction
  | UsersAction
  | GroupsAction;
