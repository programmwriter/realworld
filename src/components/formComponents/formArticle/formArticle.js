import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import FormInput from "../formInput";
import Tag from "../tag";

import cls from "./formArticle.module.scss";

const FormArticle = (props) => {
  const { onSubmit, isNew } = props;
  // const { onSubmit, isNew, articleData } = props;
  const { register, handleSubmit, errors } = useForm();

  const [tagsCount, setTagsCount] = useState(1);

  const deleteTagHandler = () => {
    setTagsCount((prevCount) => {
      if (prevCount === 1) {
        return prevCount;
      }
      return prevCount - 1;
    });
  };
  const addTagHandler = () => {
    setTagsCount((prevCount) => {
      return prevCount + 1;
    });
  };

  if (isNew) {
    console.log("FormArticle -> isNew", isNew);
  }

  const tagsInputs = [];
  let last = false;
  for (let i = 1; i <= tagsCount; i++) {
    if (i === tagsCount) last = true;
    tagsInputs.push(
      <Tag
        key={i}
        name={`tag${i}`}
        placeholder="Tag"
        errors={errors}
        last={last}
        onDelete={deleteTagHandler}
        onAdd={addTagHandler}
        ref={register({
          required: { value: true, message: "this field is required" },
          minLength: { value: 1, message: "too short" },
        })}
      />
    );
  }

  return (
    <div className={cls.article__container}>
      <h1 className={cls.title}>Create new article</h1>
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
          })}
        />
        <div className={cls.body}>
          <div className={cls.body__label}>Text</div>
          <textarea
            className={cls.body__textarea}
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
        <div className={cls.tags}>
          <div className={cls.tags__label}>Tags</div>
          {tagsInputs}
        </div>

        <div className={cls.sendButtonBox}>
          <button className={cls.button} type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormArticle;

FormArticle.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isNew: PropTypes.bool.isRequired,
  // articleData: PropTypes.shape({
  //   username: PropTypes.string,
  //   bio: PropTypes.string,
  //   image: PropTypes.string,
  //   following: PropTypes.bool,
  // }).isRequired,
};
