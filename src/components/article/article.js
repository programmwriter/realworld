import React from "react";
import PropTypes, { arrayOf } from "prop-types";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import Markdown from "markdown-to-jsx";
import { Popconfirm } from "antd";
import UserView from "../userView";

import cls from "./article.module.scss";

const Article = ({ article, isList, onDelete }) => {
  const history = useHistory();
  const username = useSelector((state) => state.user.username);

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

  const isOwnArticle = username === author.username && !isList;

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
            {isList ? (
              <Link to={`/articles/${slug}`} className={cls.article__title}>
                {title}
              </Link>
            ) : (
              <div className={cls.article__title}>{title}</div>
            )}
            <HeartOutlined
              className={cls.article__heart}
              style={{ fontSize: "16px" }}
            />
            <span className={cls.article__like}>{favoritesCount}</span>
          </div>
          <div className={cls.article__tags}>{renderTags}</div>
        </div>
        <div className={cls.article__right}>
          <UserView author={author} createdAt={createdAt} isArticle />
          {isOwnArticle && (
            <div className={cls.article__actions}>
              <Popconfirm
                placement="rightTop"
                title="Are you sure to delete this article?"
                onConfirm={onDelete}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className={cls.article__delete}>
                  Delete
                </button>
              </Popconfirm>
              <button
                onClick={() => {
                  history.push(`/articles/${slug}/edit`);
                }}
                type="button"
                className={cls.article__edit}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={cls.article__content}>
        {description}
        {!isList && (
          <div className={cls.article__markdown}>
            <Markdown options={{ forceBlock: true }}>{body}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;

Article.defaultProps = {
  onDelete: () => {},
};

Article.propTypes = {
  onDelete: PropTypes.func,
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
