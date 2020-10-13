import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../actions";
import UserView from "../userView";

import cls from "./userHeaderView.module.scss";

const UserHeaderView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHendler = () => {
    localStorage.removeItem("token");
    history.go(0);
    dispatch(logoutUser);
  };

  const user = useSelector((state) => state.user);
  return (
    <div className={cls.userHeaderView}>
      <Link to="/new-article" className={cls.createArticle}>
        Create article
      </Link>
      <Link to="/profile">
        <UserView author={user} isArticle={false} />
      </Link>

      <button onClick={logoutHendler} className={cls.logOut} type="button">
        Log Out
      </button>
    </div>
  );
};
export default UserHeaderView;
