import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Spin } from "antd";
import { setPage } from "../../actions";
import Article from "../article";

import "./articlesList.scss";

const ArticlesList = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loading);
  const articles = useSelector((state) => state.articles);
  const page = useSelector((state) => state.page);

  const articlesList = articles.map((article) => {
    return <Article key={article.createdAt} article={article} />;
  });

  const onChangePage = (changedPage) => {
    dispatch(setPage(changedPage));
  };
  return (
    <div className="articles-list">
      {!isLoading ? <Spin /> : articlesList}
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

export default ArticlesList;
