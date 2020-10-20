import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Result, Button } from "antd";
import { useHistory } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import isURL from "validator/es/lib/isURL";
import FormInput from "../formComponents/formInput";
import { updateUser, isUsernameFree, setToLStorage } from "../../services/api";
import { redirectToArticles, redirectToProfile } from "../../services/routes";
import { updateUserProfile, setLogedIn } from "../../actions";

import "antd/dist/antd.css";
import form from "../formComponents/form.module.scss";

const EditProfile = () => {
  const [errorServerValidation, setErrorServerValidation] = useState();
  const [error, setErrors] = useState();

  const userFromStore = useSelector((state) => state.user);
  const {
    token,
    username: usernameFromStore,
    email: emailFromStore,
    image: imageFromStore,
  } = userFromStore;

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      username: usernameFromStore,
      email: emailFromStore,
      image: imageFromStore,
    },
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await updateUser(data, token);

      if (response.errors) {
        setErrorServerValidation(response.errors);
      }

      if (response.user) {
        dispatch(updateUserProfile(response.user));
        dispatch(setLogedIn(true));
        const { user } = response;
        setToLStorage("user", user);
        history.push(redirectToArticles());
      }
    } catch (err) {
      setErrors(err);
    }
  };

  const errorHandler = () => {
    const errorsNames = Object.keys(error);
    const errorMsgs = errorsNames.map((err) => {
      const msgs = error[err].join(` and `);
      return `${err} ${msgs}`;
    });

    return (
      <Alert
        style={{ marginBottom: "10px" }}
        message={errorMsgs}
        type="warning"
        showIcon
        closable
      />
    );
  };

  if (error) {
    return (
      <Result
        status="warning"
        title={`There are some problems with your operation. ${error}`}
        extra={
          <Button
            onClick={() => {
              history.push(redirectToProfile());
            }}
            type="primary"
            key="console"
          >
            Back
          </Button>
        }
      />
    );
  }

  return (
    <div className={form.container}>
      {errorServerValidation && errorHandler()}
      <h1 className={form.title}>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          key={1}
          label="Username"
          name="username"
          value={usernameFromStore}
          type="text"
          errors={errors}
          ref={register({
            minLength: {
              value: 3,
              message: "Your username needs to be at least 3 characters.",
            },
            maxLength: {
              value: 20,
              message: "Your username needs to be at maximum 20 characters.",
            },
            validate: {
              checkUsername: async (value) => {
                if (value === usernameFromStore) {
                  return true;
                }
                return (
                  (await isUsernameFree(value)) || "this username is not free"
                );
              },
            },
          })}
        />
        <FormInput
          key={2}
          label="Email address"
          name="email"
          type="text"
          value={emailFromStore}
          errors={errors}
          ref={register({
            minLength: {
              value: 6,
              message: "Your email needs to be at least 6 characters.",
            },
            validate: () => {
              return isEmail(watch("email")) || "Enter correct email";
            },
          })}
        />
        <FormInput
          key={3}
          label="New password"
          name="password"
          type="password"
          value=""
          errors={errors}
          ref={register({
            required: { value: true, message: "Enter password" },
            minLength: {
              value: 8,
              message: "Your password needs to be at least 8 characters.",
            },
            maxLength: {
              value: 40,
              message: "Your password needs to be at maximum 40 characters.",
            },
          })}
        />
        <FormInput
          key={4}
          label="Avatar image (url)"
          name="image"
          type="text"
          value={imageFromStore}
          errors={errors}
          ref={register({
            minLength: { value: 8, message: "too short" },
            validate: () => {
              return isURL(watch("image")) || "Enter correct url";
            },
          })}
        />

        <button className={form.button} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
export default EditProfile;
