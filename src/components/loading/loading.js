import React from "react";

import spiner from "../../style/icons/Spinner-1s-200px.svg";
import cls from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={cls.spiner}>
      <img src={spiner} className={cls.spiner__img} alt="loading" />
    </div>
  );
};

export default Loading;
