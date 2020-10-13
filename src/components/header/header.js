import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Authorize from "../authorize";
import UserHeaderView from "../userHeaderView";
import cls from "./header.module.scss";

const Header = () => {
  const isLogedIn = useSelector((state) => state.logedIn);

  return (
    <div className={cls.header}>
      <div className={cls.header__title}>
        <Link to="/articles">Realworld Blog</Link>
      </div>
      {isLogedIn ? <UserHeaderView /> : <Authorize />}
    </div>
  );
};
export default Header;
