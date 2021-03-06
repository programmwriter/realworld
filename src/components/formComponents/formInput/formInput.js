import React from "react";
import PropTypes from "prop-types";

import cls from "./formInput.module.scss";

const FormInput = React.forwardRef((props, ref) => {
  const { label, name, errors, type } = props;

  return (
    <div className={cls.formInput}>
      <label className={cls.label} htmlFor="">
        {label}
      </label>
      <input
        className={cls.input}
        placeholder={label}
        type={type}
        name={name}
        autoComplete="on"
        ref={ref}
      />
      {errors[name] && (
        <p className={cls.errorMsg}>{`${errors[name].message}`}</p>
      )}
    </div>
  );
});
export default FormInput;

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
