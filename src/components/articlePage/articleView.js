import React from "react";
import PropTypes, { arrayOf } from "prop-types";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { HeartTwoTone } from "@ant-design/icons";

import avatar from "../../img/User-avatar.svg";
import "./articleView.scss";

const { Paragraph } = Typography;

const ArticleView = ({ article }) => {
  const { tagList } = article;
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
            <Link to={`articles/${article.slug}`} className="article__title">
              {article.title}
            </Link>
            {/* <button type="button"  onClick ={handleClick} className="article__title">{article.title}</button> */}
            <HeartTwoTone className="article__heart" twoToneColor="#eb2f96" />
            <span className="article__like">{article.favoritesCount}</span>
          </div>
          <div className="article__tags">{renderTags}</div>
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

export default ArticleView;

ArticleView.propTypes = {
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
