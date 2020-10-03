import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, CLEAR_ALERT } from "../types";
const AlertState = (props) => {
  const initialState = {
    alert: null,
  };
  const [state, dispatch] = useReducer(AlertReducer, initialState);
  const setAlert = () => {
    dispatch({ type: SET_ALERT });
  };
  const clearAlert = () => {
    dispatch({
      type: CLEAR_ALERT,
    });
  };
  return (
    <AlertContext.Provider value={{ alert: state.alert, setAlert, clearAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
