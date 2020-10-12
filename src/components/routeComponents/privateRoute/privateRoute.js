import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector((state) => state.logedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
};

export default PrivateRoute;
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
