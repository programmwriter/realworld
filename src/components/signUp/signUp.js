import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Divider, Modal } from "antd";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../formComponents/formInput";
import form from "../formComponents/form.module.scss";
import { regUser, isUsernameFree } from "../../services/api";
import { registerUser, setLogedIn } from "../../actions";
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
        const { username, password } = response.user;
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
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
            required: { value: true, message: "this field is required" },
            minLength: { value: 3, message: "too short" },
            maxLength: { value: 20, message: "too long" },
            validate: {
              checkUsername: async (value) => {
                return (
                  (await isUsernameFree(value)) || "this username is not free"
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
            required: { value: true, message: "this field is required" },
            minLength: { value: 6, message: "too short" },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "email is notvalid",
            },
          })}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 8, message: "too short" },
            maxLength: { value: 40, message: "too long" },
          })}
        />
        <FormInput
          label="Repeat Password "
          name="repeatPassword"
          type="password"
          errors={errors}
          ref={register({
            message: "passwords not match",
            required: { value: true, message: "this field is required" },
            minLength: { value: 8, message: "too short" },
            validate: {
              checkWithPass: (val) => {
                return val === `${passwordVal}` || "passwords not match";
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
                required: { value: true, message: "this field is required" },
              })}
              defaultChecked
            />
            <span className={form.checkmark} />
            {errors.agree && (
              <p style={{ color: "tomato" }}>{`${errors.agree.message}`}</p>
            )}
          </label>
        </div>

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
