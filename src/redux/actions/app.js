import { RESET_APP_VALUES, SET_APP_VALUE } from './actionTypes';

export const setAppValue = (value) => {
  return {
    type: SET_APP_VALUE,
    payload: value,
  };
};

export const resetAppValues = () => {
  return {
    type: RESET_APP_VALUES,
  };
};
