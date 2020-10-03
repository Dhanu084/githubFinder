import React, { useReducer, useContext } from "react";
import PropTypes from "prop-types";
import AlertContext from "../../Context/Alerts/AlertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"> </i>
        {" " + alert.msg}
      </div>
    )
  );
};
Alert.defaultProps = {
  alert: null,
};
Alert.prototypes = {
  alert: PropTypes.object.isRequired,
};
export default Alert;
