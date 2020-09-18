import React from "react";
import PropTypes, { arrayOf } from "prop-types";
import { Typography } from "antd";
import { HeartTwoTone } from "@ant-design/icons";

import "./article.scss";
import avatar from "../../img/User-avatar.svg";

const { Paragraph } = Typography;

const Article = ({ article }) => {
  const { tagList } = article;
  const renderTags = tagList.map((tag) => {
    return <span className="article__tag">{tag}</span>;
  });

  return (
    <div className="article">
      <div className="article__header">
        <div className="article__left">
          <div className="article__top">
            <span className="article__title">{article.title}</span>
            <HeartTwoTone className="article__heart" twoToneColor="#eb2f96" />
            <span className="article__like">{article.favoritesCount}</span>
          </div>
          <div className="article_tags">{renderTags}</div>
        </div>
        <div className="user">
          <div className="user__info">
            <div className="user__name">John Doe</div>
            <div className="user__date">March 5, 2020</div>
          </div>
          <div className="user__ava">
            <img src={avatar} alt="" />
          </div>
        </div>
      </div>
      <div className="article__content">
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "..." }}>
          {article.body}
        </Paragraph>
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
};
