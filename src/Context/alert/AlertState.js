import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT } from "../types";
const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);
  const setAlert = () => {
    dispatch({
      type: SET_ALERT,
      payload: { msg: "Please add a name", type: "light" },
    });
  };
  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {console.log(props.chidren)}
      {props.chidren}
    </AlertContext.Provider>
  );
};

export default AlertState;
