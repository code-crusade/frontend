import { RootState } from '../../store/root-reducer';

export const getLoggedInUser = (state: RootState) => state.auth.user;
