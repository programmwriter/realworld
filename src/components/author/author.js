import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

import cls from "./author.module.scss";

const Author = ({ author, createdAt }) => {
  const dt = DateTime.fromISO(createdAt, { locale: "en" });

  return (
    <div className={cls.author}>
      <div className={cls.author__info}>
        <div className={cls.author__name}>{author.username}</div>
        <div className={cls.author__date}>
          {`${dt.monthLong} ${dt.day}, ${dt.year}`}
        </div>
      </div>
      <img className={cls.author__ava} src={author.image} alt="" />
    </div>
  );
};

export default Author;

Author.propTypes = {
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }).isRequired,
};
