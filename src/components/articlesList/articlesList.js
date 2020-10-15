import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";
// import { setPage } from "../../actions";
import Article from "../article";
import Loading from "../loading";
import Error from "../error";
import { getArticlesList } from "../../services/api";

import cls from "./articlesList.module.scss";
import "./antPagination.scss";

const ArticlesList = () => {
  const dispatch = useDispatch();
  const [stateArticles, setStateArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);
  const logedIn = useSelector((state) => state.logedIn);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { articles } = await getArticlesList(5, page, token);
        setStateArticles(articles);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      setLoading(true);
    };
  }, [page, dispatch, token, logedIn]);

  const articlesList = stateArticles.map((article) => {
    return <Article key={article.createdAt} article={article} isList />;
  });

  const onChangePage = (changedPage) => {
    setPage(changedPage);
  };

  if (isError) {
    return <Error />;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cls.articles_list}>
      {articlesList}
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
