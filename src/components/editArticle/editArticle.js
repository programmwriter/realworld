import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useHistory } from "react-router-dom";
import FormArticle from "../formComponents/formArticle";
import { createArticle } from "../../services/api";
import "antd/dist/antd.css";

const EditArticle = () => {
  const [error, setErrors] = useState();
  const [visible, setVisible] = useState(false);
  const token = useSelector((state) => state.user.token);

  const history = useHistory();

  // useEffect(() => {
  //   if (!isLogedIn) {
  //     history.push("/sign-in");
  //   }
  // }, [isLogedIn]);

  const onSubmit = async (data) => {
    try {
      const response = await createArticle(data, token);

      if (response.errors) {
        setErrors(response.errors);
        setVisible(true);
      }

      if (response.article) {
        history.push("/articles");
      }
    } catch (err) {
      setErrors(err);
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
  return <FormArticle onSubmit={onSubmit} isNew />;
};
export default EditArticle;
