import React from "react";
import PropTypes from "prop-types";
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';

import cls from "./tag.module.scss";

const Tag = React.forwardRef((props, ref) => {
  const { name, last, placeholder, errors, onDelete, onAdd } = props;
  return (
    <div className={cls.tag__item}>
      <div className={cls.tag__input_box}>
        <input
          className={cls.tag__input}
          name={name}
          placeholder={placeholder}
          type="text"
          errors={errors}
          ref={ref}
        />
      </div>
      <button className={cls.tag__delete} type="button" onClick={onDelete}>
        Delete
      </button>
      {last && (
        <button className={cls.tag__add} type="button" onClick={onAdd}>
          Add tag
        </button>
      )}
    </div>
  );
});
export default Tag;

Tag.propTypes = {
  last: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
