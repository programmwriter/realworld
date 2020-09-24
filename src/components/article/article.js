import React from "react";
import PropTypes, { arrayOf } from "prop-types";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { DateTime } from "luxon";
import Markdown from "markdown-to-jsx";

import "./article.scss";

const { Paragraph } = Typography;

const Article = ({ article, isList }) => {
  const dt = DateTime.fromISO(article.createdAt, { locale: "en" });

  const {
    tagList,
    slug,
    title,
    favoritesCount,
    author,
    description,
    body,
  } = article;

  const renderTags = tagList.map((tag) => {
    return (
      <span key={tag} className="article__tag">
        {tag}
      </span>
    );
  });

  return (
    <div className="article">
      <div className="article__header">
        <div className="article__left">
          <div className="article__top">
            <Link to={`articles/${slug}`} className="article__title">
              {title}
            </Link>
            <HeartTwoTone className="article__heart" twoToneColor="#eb2f96" />
            <span className="article__like">{favoritesCount}</span>
          </div>
          <div className="article__tags">{renderTags}</div>
        </div>
        <div className="user">
          <div className="user__info">
            <div className="user__name">{author.username}</div>
            <div className="user__date">
              {`${dt.monthLong} ${dt.day}, ${dt.year}`}
            </div>
          </div>
          <img className="user__ava" src={author.image} alt="" />
        </div>
      </div>
      <div className="article__content">
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "..." }}>
          {description}
        </Paragraph>

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
