import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Result, Divider, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../formComponents/formInput";
import form from "../formComponents/form.module.scss";
import { regUser } from "../../services/api";
import { registerUser } from "../../actions";
import "antd/dist/antd.css";

const SignUp = () => {
  const { register, watch, handleSubmit, errors } = useForm();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (data) => {
    try {
      const { user } = await regUser(data);
      dispatch(registerUser(user));
      history.push("/articles");
    } catch (err) {
      setError(err);
    }
  };
  const passwordVal = watch("password", "");
  if (error) {
    return (
      <Result
        status="warning"
        title={`There are some problems with your operation.${error}`}
        extra={
          <Button type="primary" key="console">
            Go Console
          </Button>
        }
      />
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
            minLength: { value: 6, message: "too short" },
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
            minLength: { value: 3, message: "too short" },
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
