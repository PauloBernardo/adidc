import { USER_LOGGED, USER_LOGOUT } from './actionTypes';

export const userLogged = (user) => {
  return {
    type: USER_LOGGED,
    payload: user,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};
