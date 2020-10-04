import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { useHistory } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom";
import FormInput from "../formComponents/formInput";
import { updateUser } from "../../services/api";
import { updateUserProfile, setLogedIn } from "../../actions";

import "antd/dist/antd.css";
import form from "../formComponents/form.module.scss";

// import cls from "./newArticle.module.scss";

const NewArticle = () => {
  const { register, handleSubmit, errors } = useForm();

  const [error, setErrors] = useState();
  const [visible, setVisible] = useState(false);

  // const isLogedIn = useSelector((state) => state.logedIn);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   if (!isLogedIn) {
  //     history.push("/sign-in");
  //   }
  // }, [isLogedIn]);

  const onSubmit = async (data) => {
    try {
      const response = await updateUser(data, token);

      if (response.errors) {
        setErrors(response.errors);
        setVisible(true);
      }

      if (response.user) {
        dispatch(updateUserProfile(response.user));
        dispatch(setLogedIn(true));
        const { email } = response.user;
        localStorage.setItem("email", email);
        localStorage.setItem("password", data.password);
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
            // validate: {
            //   checkUsername: async (value) => {
            //     if (value === usernameFromStore) {
            //       return true;
            //     }
            //     return (
            //       (await isUsernameFree(value)) || "this username is not free"
            //     );
            //   },
            // },
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
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "email is notvalid",
            },
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
          <div className={form.tags__item}>
            <div className={form.tags__input_box}>
              <input
                className={form.tags__input}
                key={2}
                name="description"
                placeholder="Tag"
                type="text"
                errors={errors}
                ref={register({
                  required: { value: true, message: "this field is required" },
                  minLength: { value: 6, message: "too short" },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "email is notvalid",
                  },
                })}
              />
            </div>
            <button className={form.tags__delete} type="button">
              Delete
            </button>
          </div>
          <div className={form.tags__item}>
            <div className={form.tags__input_box}>
              <input
                className={form.tags__input}
                key={2}
                name="description"
                placeholder="Tag"
                type="text"
                errors={errors}
                ref={register({
                  required: { value: true, message: "this field is required" },
                  minLength: { value: 6, message: "too short" },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "email is notvalid",
                  },
                })}
              />
            </div>
            <button className={form.tags__delete} type="button">
              Delete
            </button>
            <button className={form.tags__add} type="button">
              Delete
            </button>
          </div>
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
