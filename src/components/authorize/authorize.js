import React from "react";
import { Link } from "react-router-dom";
import { redirectToSignIn, redirectToSignUp } from "../../services/routes";

import cls from "./authorize.module.scss";

const Authorize = () => {
  return (
    <div className={cls.autorize}>
      <Link to={redirectToSignIn()} type="button" className={cls.sign}>
        Sign In
      </Link>
      <Link to={redirectToSignUp} type="button" className={cls.sign}>
        Sign Up
      </Link>
    </div>
  );
};
export default Authorize;
