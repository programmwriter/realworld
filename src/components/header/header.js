import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        <Link to="/">Realworld Blog</Link>
      </div>
      <div className="header__autorize">
        <button type="button" className="header__sign">
          Sign In
        </button>
        <button type="button" className="header__sign header__sign--active">
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default Header;
