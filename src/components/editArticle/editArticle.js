import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Result, Button } from "antd";
import FormArticle from "../formComponents/formArticle";
import { getSingleArticle, updateArticle } from "../../services/api";
import {
  redirectToArticle,
  redirectToEditArticle,
} from "../../services/routes";
import Loading from "../loading";
import "antd/dist/antd.css";

const EditArticle = () => {
  const { slug } = useParams();
  const history = useHistory();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorServerValidation, setErrorServerValidation] = useState();
  const [error, setErrors] = useState();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { article: art } = await getSingleArticle(slug);
        setArticle(art);
        setIsLoading(false);
      } catch (errorFromFetch) {
        setErrors(errorFromFetch);
      }
    };

    fetchData();
  }, [slug]);

  const onSubmit = async (data) => {
    try {
      const response = await updateArticle(data, slug, token);

      if (response.errors) {
        setErrorServerValidation(response.errors);
      }

      if (response.article) {
        const { slug: newSlag } = response.article;
        history.push(redirectToArticle(newSlag));
      }
    } catch (err) {
      setErrors(err);
    }
  };

  if (error) {
    return (
      <Result
        status="warning"
        title={`There are some problems with your operation. ${error}`}
        extra={
          <Button
            onClick={() => {
              history.push(redirectToEditArticle(slug));
            }}
            type="primary"
            key="console"
          >
            Go Console
          </Button>
        }
      />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormArticle
      onSubmit={onSubmit}
      isNew={false}
      articleData={article}
      formTitle="Edit article"
      error={errorServerValidation}
    />
  );
};
export default EditArticle;
