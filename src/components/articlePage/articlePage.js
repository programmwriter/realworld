import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleArticle, deleteArticle } from "../../services/api";
import Article from "../article";
import cls from "./articlePage.module.scss";
import Loading from "../loading";
import Error from "../error";

const ArticlePage = () => {
  const { slug } = useParams();
  const history = useHistory();

  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [stateArticle, setStateArticle] = useState({});
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { article } = await getSingleArticle(slug);

        setStateArticle(article);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      setLoading(true);
    };
  }, [slug]);

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
        article={stateArticle}
        onDelete={deleteArticleHandler}
        isList={false}
      />
    </div>
  );
};

export default ArticlePage;
