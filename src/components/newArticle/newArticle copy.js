import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { useHistory } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom";
import FormInput from "../formComponents/formInput";
import Tag from "../formComponents/tag";
import { createArticle } from "../../services/api";
import "antd/dist/antd.css";
import form from "../formComponents/form.module.scss";

// import cls from "./newArticle.module.scss";

const NewArticle = () => {
  const { register, handleSubmit, errors } = useForm();

  const [error, setErrors] = useState();
  const [visible, setVisible] = useState(false);
  const [tagsCount, setTagsCount] = useState(1);

  // const isLogedIn = useSelector((state) => state.logedIn);
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
  const deleteTagHandler = () => {
    setTagsCount((prevCount) => {
      if (prevCount === 1) {
        return prevCount;
      }
      return prevCount - 1;
    });
  };
  const addTagHandler = () => {
    setTagsCount((prevCount) => {
      return prevCount + 1;
    });
  };

  const tagsInputs = [];
  let last = false;
  for (let i = 1; i <= tagsCount; i++) {
    if (i === tagsCount) last = true;
    tagsInputs.push(
      <Tag
        key={i}
        name={`tag${i}`}
        placeholder="Tag"
        errors={errors}
        last={last}
        onDelete={deleteTagHandler}
        onAdd={addTagHandler}
        ref={register({
          required: { value: true, message: "this field is required" },
          minLength: { value: 1, message: "too short" },
        })}
      />
    );
  }

  return (
    <div className={form.article__container}>
      <h1 className={form.title}>Create new article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          key={1}
          label="Title"
          name="title"
          type="text"
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 3, message: "too short" },
            maxLength: { value: 20, message: "too long" },
          })}
        />
        <FormInput
          key={2}
          label="Short description"
          name="description"
          type="text"
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 6, message: "too short" },
          })}
        />
        <div className={form.body}>
          <div className={form.body__label}>Text</div>
          <textarea
            className={form.body__textarea}
            name="body"
            rows="7"
            placeholder="Text"
            errors={errors}
            ref={register({
              required: { value: true, message: "this field is required" },
              minLength: { value: 6, message: "too short" },
            })}
          />
        </div>
        <div className={form.tags}>
          <div className={form.tags__label}>Tags</div>
          {tagsInputs}
        </div>

        <div className={form.sendButtonBox}>
          <button className={form.button} type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewArticle;
