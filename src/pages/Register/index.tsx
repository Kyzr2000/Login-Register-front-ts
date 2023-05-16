import { Button, Checkbox, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
//接口限制user
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
//接口限制inputuser
interface InputUser {
  email: string;
  password: string;
  nickname: string;
  phone: string;
  gender: string;
}

//graphql定义插入语言
const ADD_USER = gql`
  mutation AddUser($createUserInput: CreateUserInput!) {
    addUser(createUserInput: $createUserInput) {
      email
      password
    }
  }
`;
const USER_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      email
      password
    }
  }
`;
const Register: React.FC = () => {
  const [email, setEmail] = useState<string | null>();
  //修改标题
  document.title = "注册界面";
  const [form] = Form.useForm();
  const [add] = useMutation(ADD_USER);
  const { data } = useQuery(USER_EMAIL, {
    skip: !email,
    variables: { email },
  });

  const onFinish = async (values: User) => {
    console.log(data.getUserByEmail);
    if (!data.getUserByEmail) {
      add({
        variables: {
          createUserInput: {
            email: values.email,
            password: values.password,
            nickname: values.nickname,
            phone: values.phone,
            gender: values.gender,
          },
        },
      });
      alert("注册成功！");
      window.location.href = "/";
    } else {
      alert("该用户名被注册过了！");
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="registerForm">
      <Form
        className="kyzr-form"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              const email = e.target.value;
              setEmail(email);
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入你的密码!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次密码不一样啊!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="昵称"
          tooltip="你想让别人管你叫啥?"
          rules={[
            {
              required: true,
              message: "请输入你的昵称!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="手机号 "
          rules={[{ required: true, message: "请输入你的手机号!" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="性别"
          rules={[{ required: true, message: "请选择你的性别!" }]}
        >
          <Select placeholder="选择你的性别">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("注：同意协议后才能注册")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            我已经阅读并了解<a href="">本站协议</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
