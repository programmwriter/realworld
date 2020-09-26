import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { recieveArticle, setLoadingArticle, setError } from "../../actions";
import { getSingleArticle } from "../../services/api";
import Article from "../article";
import cls from "./articlePage.module.scss";
import Loading from "../loading";
import Error from "../error";

const ArticlePage = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const isError = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.loading.article);
  const storeArticle = useSelector((state) => state.article);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { article } = await getSingleArticle(slug);

        dispatch(recieveArticle(article));
        dispatch(setLoadingArticle(false));
      } catch (error) {
        dispatch(setError(true));
        dispatch(setLoadingArticle(false));
      }
    };

    fetchData();
    return () => {
      dispatch(setLoadingArticle(true));
    };
  }, [slug, dispatch]);

  if (isError) {
    return <Error />;
  }
  if (isLoading) {
    return <Loading />;
  }

  // const content = isLoading ? (
  //   <Loading />
  // ) : (
  //   <Article article={storeArticle} isList={false} />
  // );

  return (
    <div className={cls.article_page}>
      <Article article={storeArticle} isList={false} />
    </div>
  );
  // return <div className={cls.article_page}>{content}</div>;
};

export default ArticlePage;
