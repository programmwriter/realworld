import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Spin } from "antd";
import { setPage, recieveArticles, setLoadingArticles } from "../../actions";
import Article from "../article";
import { getArticlesList } from "../../services/api";

import cls from "./articlesList.module.scss";
import "./antPagination.scss";

const ArticlesList = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loading);
  const storeArticles = useSelector((state) => state.articles);
  const page = useSelector((state) => state.page);

  useEffect(() => {
    const fetchData = async () => {
      const { articles } = await getArticlesList(5, page);

      dispatch(recieveArticles(articles));
      dispatch(setLoadingArticles(true));
    };

    fetchData();
    return () => {
      dispatch(setLoadingArticles(false));
    };
  }, [page, dispatch]);

  const articlesList = storeArticles.map((article) => {
    return <Article key={article.createdAt} article={article} isList />;
  });

  const onChangePage = (changedPage) => {
    dispatch(setPage(changedPage));
  };
  return (
    <div className={cls.articles_list}>
      {!isLoading ? <Spin /> : articlesList}
      <div className={cls.pagination}>
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
