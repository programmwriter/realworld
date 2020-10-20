import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Error from "../error";
import FormArticle from "../formComponents/formArticle";
import { createArticle } from "../../services/api";
import { redirectToArticles } from "../../services/routes";
import "antd/dist/antd.css";

const NewArticle = () => {
  const [errorServerValidation, setErrorServerValidation] = useState();
  const [error, setErrors] = useState();
  const token = useSelector((state) => state.user.token);

  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await createArticle(data, token);

      if (response.errors) {
        setErrorServerValidation(response.errors);
      }

      if (response.article) {
        history.push(redirectToArticles());
      }
    } catch (err) {
      setErrors(err);
    }
  };

  if (error) {
    return <Error />;
  }

  return (
    <FormArticle
      onSubmit={onSubmit}
      isNew
      formTitle="Create new article"
      error={errorServerValidation}
    />
  );
};
export default NewArticle;
