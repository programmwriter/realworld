import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../formComponents/formInput";
import { authUser } from "../../services/api";
import { authenticateUser, setLogedIn, setToken } from "../../actions";

import "antd/dist/antd.css";
import form from "../formComponents/form.module.scss";

const SignIn = () => {
  const { register, handleSubmit, errors } = useForm();
  const [error, setErrors] = useState();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await authUser(data);

      if (response.errors) {
        setErrors(response.errors);
        setVisible(true);
      }

      if (response.user) {
        dispatch(authenticateUser(response.user));
        dispatch(setLogedIn(true));
        const { token } = response.user;
        dispatch(setToken(token));
        localStorage.setItem("token", token);
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
    <div className={form.container}>
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
          <Link className={form.accExist__link} to="/sign-up">
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignIn;
