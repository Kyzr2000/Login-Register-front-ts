import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/userState";
interface userInfo {
  username: string;
  password: string;
  remember: boolean;
}
interface User {
  agreement: boolean;
  email: string;
  password: string;
  confirm: string;
  nickname: string;
  prefix: string;
  phone: string;
  gender: string;
}
const Login: React.FC = () => {
  document.title = "登录界面";
  //读取recoil内数据
  const list = useRecoilValue(userState);
  //处理成功登录后的函数
  const onFinish = (values: userInfo) => {
    let isExist: boolean = false;
    let currentUser: User;
    console.log("Success:", values);
    list.forEach((item: User) => {
      if (item.email === values.username && item.password === values.password) {
        currentUser = item;
        isExist = true;
      }
    });

    if (isExist) {
      alert(`登陆成功！我的朋友:${currentUser!.nickname}`);
    } else {
      alert("账号密码不对诶！");
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
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入你的密码!" }]}
        >
          <Input.Password />
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
