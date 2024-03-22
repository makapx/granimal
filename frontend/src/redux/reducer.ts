import { SET_USER, SET_COOKIES } from "./actions.d";

const initialState = {
  user: null,
  cookies: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_COOKIES:
      return {
        ...state,
        cookies: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
