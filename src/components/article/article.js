import React from "react";
import PropTypes, { arrayOf } from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import Markdown from "markdown-to-jsx";
import Author from "../author";

import cls from "./article.module.scss";

const Article = ({ article, isList }) => {
  const history = useHistory();
  const location = useLocation();

  const {
    createdAt,
    tagList,
    slug,
    title,
    favoritesCount,
    author,
    description,
    body,
  } = article;

  const handleClick = () => {
    const pushPath = `/articles/${slug}`;
    const { pathname } = location;
    if (pushPath === pathname) {
      return;
    }
    history.push(pushPath);
  };

  const renderTags = tagList.map((tag) => {
    return (
      <span key={tag} className={cls.article__tag}>
        {tag}
      </span>
    );
  });

  return (
    <div className={cls.article}>
      <div className={cls.article__header}>
        <div className={cls.article__left}>
          <div className={cls.article__top}>
            <div
              onClick={handleClick}
              className={cls.article__title}
              role="button"
              tabIndex="0"
              aria-hidden="true"
            >
              {title}
            </div>
            <HeartOutlined
              className={cls.article__heart}
              style={{ fontSize: "16px" }}
            />
            <span className={cls.article__like}>{favoritesCount}</span>
          </div>
          <div className={cls.article__tags}>{renderTags}</div>
        </div>
        <Author author={author} createdAt={createdAt} />
      </div>
      <div className={cls.article__content}>
        {description}
        {!isList && <Markdown>{body}</Markdown>}
      </div>
    </div>
  );
};

export default Article;

Article.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    author: PropTypes.shape({
      username: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.string,
      following: PropTypes.bool,
    }),
  }).isRequired,
  isList: PropTypes.bool.isRequired,
};
