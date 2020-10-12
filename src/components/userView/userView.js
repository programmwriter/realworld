import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

import userLogo from "../../img/userLogo.svg";
import cls from "./userView.module.scss";

const UserView = ({ author, createdAt, isArticle }) => {
  const dt = DateTime.fromISO(createdAt, { locale: "en" });
  const { username, image } = author;
  return (
    <div className={cls.userView}>
      <div className={cls.userView__info}>
        <div className={cls.userView__name}>{username}</div>
        {isArticle && (
          <div className={cls.userView__date}>
            {`${dt.monthLong} ${dt.day}, ${dt.year}`}
          </div>
        )}
      </div>
      <img className={cls.userView__ava} src={image || userLogo} alt="" />
    </div>
  );
};

export default UserView;

UserView.defaultProps = {
  createdAt: "",
};

UserView.propTypes = {
  createdAt: PropTypes.string,
  isArticle: PropTypes.bool.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }).isRequired,
};
