import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Pagination } from "antd";

import { setPage } from "../../actions";
import Article from "../article";
import "./articlesList.scss";

const ArticlesList = ({ articles, dispatchPage, page }) => {
  const articlesList = articles.map((article) => {
    return <Article key={article.createdAt} article={article} />;
  });

  const onChangePage = (changedPage) => {
    dispatchPage(changedPage);
  };
  return (
    <div className="articles-list">
      {articlesList}
      <div className="pagination">
        <Pagination
          current={page}
          onChange={onChangePage}
          size="small"
          total={500}
          defaultPageSize={5}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchPage: (page) => dispatch(setPage(page)),
});
const mapStateToProps = ({ articles, page }) => ({
  articles,
  page,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchPage: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};
