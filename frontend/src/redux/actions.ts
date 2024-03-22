import { SET_USER, SET_COOKIES } from "./actions.d";

export const setUser = (user: any) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setCookies = (cookies: any) => {
  return {
    type: SET_COOKIES,
    payload: cookies,
  };
};