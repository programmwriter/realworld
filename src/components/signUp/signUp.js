import React from "react";
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import FormInput from "../formComponents/formInput";

// import cls from "./signUp.module.scss";
import form from "../formComponents/form.module.scss";
import "antd/dist/antd.css";

const SignUp = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={form.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="username"
          name="username"
          ref={register({
            required: { value: true, message: "this fild is required" },
            minLength: { value: 3, message: "too short" },
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <input type="submit" />
      </form>
    </div>
  );
};
export default SignUp;
