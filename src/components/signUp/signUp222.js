// import React from "react";
// // import React, { useState } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useParams } from 'react-router-dom';
// import { useForm } from "react-hook-form";

// import { Form, Input, Button, Checkbox, Typography } from "antd";
// import cls from "./signUp.module.scss";
// import "antd/dist/antd.css";

// const { Title, Link } = Typography;

// const SignUp = () => {
//   const { register, handleSubmit, watch, errors } = useForm();
//   const onSubmit = data => console.log(data);

//   return (
//     <div className={cls.signUp}>
//       <Form
//         form={form}
//         layout="vertical"
//         // initialValues={{
//         //   requiredMark,
//         // }}
//         // onValuesChange={onRequiredTypeChange}
//         // requiredMark={requiredMark}
//       >
//         <Form.Item>
//           <Title className={cls.title} level={4}>
//             Create new account
//           </Title>
//         </Form.Item>
//         <Form.Item label="Username" required>
//           <Input className={cls.input} placeholder="Username" />
//         </Form.Item>
//         <Form.Item label="Email address" required>
//           <Input className={cls.input} placeholder="Email address" />
//         </Form.Item>
//         <Form.Item label="Password " required>
//           <Input className={cls.input} placeholder="Password " />
//         </Form.Item>
//         <Form.Item label="Repeat Password " required>
//           <Input className={cls.input} placeholder="Repeat Password " />
//         </Form.Item>
//         <Form.Item>
//           <Checkbox value="A">
//             I agree to the processing of my personal information
//           </Checkbox>
//         </Form.Item>
//         <Form.Item>
//           <Button className={cls.button} type="primary">
//             Create
//           </Button>
//         </Form.Item>
//         {/* <Form.Item> */}
//         <div className={cls.text}>
//           Already have an account? &nbsp;
//           <Link href="https://ant.design" target="_blank">
//             Sign In.
//           </Link>
//         </div>
//         {/* </Form.Item> */}
//       </Form>
//     </div>
//   );
// };
// export default SignUp;
