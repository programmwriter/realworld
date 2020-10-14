import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useHistory, useParams } from "react-router-dom";
import FormArticle from "../formComponents/formArticle";
import { getSingleArticle, updateArticle } from "../../services/api";
import Loading from "../loading";
import "antd/dist/antd.css";

const EditArticle = () => {
  const { slug } = useParams();
  const history = useHistory();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErrors] = useState();
  const [visible, setVisible] = useState(false);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { article: art } = await getSingleArticle(slug);
        setArticle(art);
        setIsLoading(false);
      } catch (errorFromFetch) {
        setErrors(errorFromFetch);
        setVisible(true);
      }
    };

    fetchData();
  }, [slug]);

  const onSubmit = async (data) => {
    try {
      const response = await updateArticle(data, slug, token);

      if (response.errors) {
        setErrors(response.errors);
        setVisible(true);
      }

      if (response.article) {
        const { slug: newSlag } = response.article;
        history.push(`/articles/${newSlag}`);
      }
    } catch (err) {
      setErrors(err);
      setVisible(true);
    }
  };

  if (error) {
    const errorsNames = Object.keys(error);
    const errorMsgs = errorsNames.map((err) => {
      const msgs = error[err].join(` and `);
      return <p style={{ color: "red" }}>{`${err}: ${msgs}`}</p>;
    });

    return (
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={() => {
          setVisible(false);
          history.go(0);
        }}
        onCancel={() => {
          setVisible(false);
          history.go(0);
        }}
      >
        {errorMsgs}
      </Modal>
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
    />
  );
};
export default EditArticle;
