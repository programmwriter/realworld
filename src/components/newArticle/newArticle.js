import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import FormArticle from "../formComponents/formArticle";
import { createArticle } from "../../services/api";
import {
  redirectToArticles,
  redirectToNewArticle,
} from "../../services/routes";
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
    return (
      <Result
        status="warning"
        title={`There are some problems with your operation. ${error}`}
        extra={
          <Button
            onClick={() => {
              history.push(redirectToNewArticle());
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
