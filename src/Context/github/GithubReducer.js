import { SET_LOADING, SEARCH_USER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        state,
      };
  }
};
