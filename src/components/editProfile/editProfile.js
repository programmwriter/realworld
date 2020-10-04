import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../formComponents/formInput";
import { updateUser, isUsernameFree } from "../../services/api";
import { updateUserProfile, setLogedIn } from "../../actions";

import "antd/dist/antd.css";
import form from "../formComponents/form.module.scss";

// const myRE = new RegExp(
//   [
//     '^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>(),[\\]\\.,;:\\s@\\"]+)*)',
//     '|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
//     "[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+",
//     "[a-zA-Z]{2,}))$",
//   ].join("")
// );

const EditProfile = () => {
  const { register, handleSubmit, errors } = useForm();

  const [error, setErrors] = useState();
  const [visible, setVisible] = useState(false);

  const isLogedIn = useSelector((state) => state.logedIn);
  const userFromStore = useSelector((state) => state.user);
  const {
    token,
    username: usernameFromStore,
    email: emailFromStore,
    image: imageFromStore,
  } = userFromStore;
  const passwordFromLS = localStorage.getItem("password");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isLogedIn) {
      history.push("/sign-in");
    }
    // eslint-disable-next-line
  }, [isLogedIn]);

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
    <div className={form.container}>
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
            required: { value: true, message: "this field is required" },
            minLength: { value: 3, message: "too short" },
            maxLength: { value: 20, message: "too long" },
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
            required: { value: true, message: "this field is required" },
            minLength: { value: 6, message: "too short" },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "email is notvalid",
            },
          })}
        />
        <FormInput
          key={3}
          label="New password"
          name="password"
          type="password"
          value={passwordFromLS}
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 8, message: "too short" },
            maxLength: { value: 40, message: "too long" },
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
            required: { value: true, message: "this field is required" },
            minLength: { value: 8, message: "too short" },
            // pattern: {
            //   value: new RegExp(myRE),
            //   message: "url is notvalid",
            // },
          })}
        />

        <button className={form.button} type="submit">
          Save
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
export default EditProfile;
