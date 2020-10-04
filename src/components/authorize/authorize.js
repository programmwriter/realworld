import React from "react";
import { Link } from "react-router-dom";

import cls from "./authorize.module.scss";

const Authorize = () => {
  return (
    <div className={cls.autorize}>
      <Link to="/sign-in" type="button" className={cls.sign}>
        Sign In
      </Link>
      <Link to="/sign-up" type="button" className={cls.sign}>
        Sign Up
      </Link>
    </div>
  );
};
export default Authorize;
