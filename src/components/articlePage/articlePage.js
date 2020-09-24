import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import { recieveArticle, setLoadingArticle } from "../../actions";
import { getSingleArticle } from "../../services/api";
import Article from "../article";
import "./articlePage.scss";

const ArticlePage = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loading.article);
  const storeArticle = useSelector((state) => state.article);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { article } = await getSingleArticle(slug);

        dispatch(recieveArticle(article));
        dispatch(setLoadingArticle(true));
      } catch (error) {
        dispatch(setLoadingArticle(true));
      }
    };
    fetchData();
    return () => {
      dispatch(setLoadingArticle(false));
    };
  }, [slug, dispatch]);

  const content = !isLoading ? (
    <Spin />
  ) : (
    <Article article={storeArticle} isList={false} />
  );

  return <div className="article-page">{content}</div>;
};

export default ArticlePage;
