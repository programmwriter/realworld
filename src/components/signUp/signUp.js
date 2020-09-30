import React from "react";
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Divider } from "antd";
import FormInput from "../formComponents/formInput";
// import cls from "./signUp.module.scss";
import form from "../formComponents/form.module.scss";
import "antd/dist/antd.css";

const SignUp = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={form.container}>
      <h1 className={form.title}>Create new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Username"
          name="username"
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 3, message: "too short" },
          })}
        />
        <FormInput
          label="Email address"
          name="email"
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 3, message: "too short" },
          })}
        />
        <FormInput
          label="Password"
          name="password"
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 3, message: "too short" },
          })}
        />
        <FormInput
          label="Repeat Password "
          name="repeatPassword "
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 3, message: "too short" },
          })}
        />

        <Divider />

        <div className={form.agreement}>
          <label className={form.checkbox_box}>
            I agree to the processing of my personal information
            <input className={form.checkbox} type="checkbox" name="" id="" />
            <span className={form.checkmark} />
          </label>
        </div>

        <button className={form.button} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};
export default SignUp;
