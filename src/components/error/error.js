import React from "react";
import { Result } from "antd";

import cls from "./error.module.scss";

const Error = (msg) => {
  return (
    <div className={cls.error}>
      <Result
        status="warning"
        title={`There are some problems with your operation. ${msg}`}
      />
    </div>
  );
};
export default Error;
