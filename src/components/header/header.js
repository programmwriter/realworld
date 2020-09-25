import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import cls from "./header.module.scss";

const Header = () => {
  const btnSign = classNames({
    [cls.header__sign]: true,
    [cls.header__sign_active]: false,
  });
  const btnSignActive = classNames({
    [cls.header__sign]: true,
    [cls.header__sign_active]: true,
  });

  return (
    <div className={cls.header}>
      <div className={cls.header__title}>
        <Link to="/articles">Realworld Blog</Link>
      </div>
      <div className={cls.header__autorize}>
        <button type="button" className={btnSign}>
          Sign In
        </button>
        <button type="button" className={btnSignActive}>
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default Header;
