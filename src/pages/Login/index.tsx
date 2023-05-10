import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";

import { gql, useQuery } from "@apollo/client";
interface userInfo {
  username: string;
  password: string;
  remember: boolean;
}
interface User {
  email: string;
  password: string;
}
const USER_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      email
      password
    }
  }
`;
const Login: React.FC = () => {
  document.title = "登录界面";
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const { data } = useQuery(USER_EMAIL, {
    skip: !user.email,
    variables: { email: user.email },
  });

  //处理成功登录后的函数
  const onFinish = (values: userInfo) => {
    console.log(data);
    console.log(user);
    if (data) {
      //账号存在
      const currUser = data.getUserByEmail;
      if (
        currUser.email === user.email &&
        currUser.password === user.password
      ) {
        alert("登录成功！");
      } else {
        alert("登陆失败！");
      }
    } else {
      alert("账号不存在！");
    }
  };
  //处理失败登录后的函数
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    alert(`登陆失败！你再检查一下信息呢？`);
  };
  return (
    <div className="loginForm">
      <Form
        className="kyzr-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[{ required: true, message: "请输入你的账号!" }]}
        >
          <Input
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入你的密码!" }]}
        >
          <Input.Password
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            点我登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
