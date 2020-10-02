import { SET_ALERT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        msg: "Please add a name",
        type: "light",
      };
    default:
      return {
        state,
      };
  }
};
