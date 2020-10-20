import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { redirectToArticles } from "../../../services/routes";

const LogedInRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector((state) => state.logedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectToArticles()} />
        )
      }
    />
  );
};

export default LogedInRoute;
LogedInRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
