import React from "react";
import { Result, Button } from "antd";

import cls from "./error.module.scss";

const Error = () => {
  return (
    <div className={cls.error}>
      <Result
        status="warning"
        title="There are some problems with your operation."
        extra={
          <Button type="primary" key="console">
            Go Console
          </Button>
        }
      />
    </div>
  );
};
export default Error;
