import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Divider, Modal } from "antd";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import FormInput from "../formComponents/formInput";
import form from "../formComponents/form.module.scss";
import { regUser, isUsernameFree } from "../../services/api";
import { registerUser, setLogedIn, setToken } from "../../actions";
import "antd/dist/antd.css";

const SignUp = () => {
  const { register, watch, handleSubmit, errors } = useForm();
  const [error, setErrors] = useState();
  const [visible, setVisible] = useState(false);
  const passwordVal = watch("password", "");
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await regUser(data);

      if (response.errors) {
        setErrors(response.errors);
        setVisible(true);
      }

      if (response.user) {
        dispatch(registerUser(response.user));
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
      <h1 className={form.title}>Create new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Username"
          name="username"
          type="text"
          errors={errors}
          ref={register({
            required: { value: true, message: "Enter username" },
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
                return (
                  (await isUsernameFree(value)) ||
                  "Username has already been taken"
                );
              },
            },
          })}
        />
        <FormInput
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
            validate: () => {
              return isEmail(watch("email")) || "Enter correct email";
            },
          })}
        />
        <FormInput
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
        <FormInput
          label="Repeat Password "
          name="repeatPassword"
          type="password"
          errors={errors}
          ref={register({
            message: "passwords not match",
            required: { value: true, message: "Repeat password" },
            minLength: {
              value: 8,
              message: "Your password needs to be at least 8 characters.",
            },
            validate: {
              checkWithPass: (val) => {
                return val === `${passwordVal}` || "Passwords must match";
              },
            },
          })}
        />
        <Divider style={{ marginTop: "20px", marginBottom: "8px" }} />
        <div className={form.agreement}>
          <label className={form.checkbox_box}>
            I agree to the processing of my personal information
            <input
              className={form.checkbox}
              type="checkbox"
              name="agree"
              ref={register({
                required: {
                  value: true,
                  message: "Please accept the terms and conditions to continue",
                },
              })}
              defaultChecked
            />
            <span className={form.checkmark} />
          </label>
        </div>
        {errors.agree && (
          <p style={{ color: "red" }}>{`${errors.agree.message}`}</p>
        )}

        <button className={form.button} type="submit">
          Create
        </button>
        <p className={form.accExist}>
          Already have an account?&nbsp;
          <Link className={form.accExist__link} to="/sign-in">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
