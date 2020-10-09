import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { recieveArticle, setLoadingArticle, setError } from "../../actions";
import { getSingleArticle, deleteArticle } from "../../services/api";
import Article from "../article";
import cls from "./articlePage.module.scss";
import Loading from "../loading";
import Error from "../error";

const ArticlePage = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const isError = useSelector((state) => state.error);
  const token = useSelector((state) => state.user.token);
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
  const deleteArticleHandler = async () => {
    await deleteArticle(slug, token);
    history.push(`/articles`);
  };

  return (
    <div className={cls.article_page}>
      <Article
        article={storeArticle}
        onDelete={deleteArticleHandler}
        isList={false}
      />
    </div>
  );
};

export default ArticlePage;
