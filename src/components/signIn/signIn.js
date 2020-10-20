import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Result, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../formComponents/formInput";
import { authUser, setToLStorage } from "../../services/api";
import {
  redirectToSignIn,
  redirectToSignUp,
  redirectToArticles,
} from "../../services/routes";
import { authenticateUser, setLogedIn } from "../../actions";

import "antd/dist/antd.css";
import form from "../formComponents/form.module.scss";

const SignIn = () => {
  const { register, handleSubmit, errors } = useForm();
  const [errorServerValidation, setErrorServerValidation] = useState();
  const [error, setErrors] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await authUser(data);

      if (response.errors) {
        setErrorServerValidation(response.errors);
      }

      if (response.user) {
        dispatch(setLogedIn(true));
        const { user } = response;
        setToLStorage("user", user);
        dispatch(authenticateUser(user));
        history.push(redirectToArticles());
      }
    } catch (err) {
      setErrors(err);
    }
  };

  const errorHandler = () => {
    const errorsNames = Object.keys(errorServerValidation);
    const errorMsgs = errorsNames.map((err) => {
      const msgs = errorServerValidation[err].join(` and `);
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
              history.push(redirectToSignIn());
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
      <h1 className={form.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          key={1}
          label="Email address"
          name="email"
          type="text"
          errors={errors}
          ref={register({
            required: { value: true, message: "Enter email" },
            minLength: {
              value: 6,
              message: "Your email needs to be at least 6 characters.",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter valid email",
            },
          })}
        />
        <FormInput
          key={2}
          label="Password"
          name="password"
          type="password"
          errors={errors}
          ref={register({
            required: { value: true, message: "Enter valid password" },
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

        <button className={form.button} type="submit">
          Login
        </button>
        <p className={form.accExist}>
          Don’t have an account?&nbsp;
          <Link className={form.accExist__link} to={redirectToSignUp()}>
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignIn;
