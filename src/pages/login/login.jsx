import React from 'react'
import { useForm } from 'react-hook-form'
import { useLogin } from './service/mutation/useLogin';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { mutate } = useLogin();
  const navigate = useNavigate();

  const submit = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/app', { replace: true });
        message.success("success");
      }
    });
  }
  
  return (
    <div className='container' >
      <Form name='basic' layout='vertical' style={{ maxWidth: 600 }}  onFinish={submit}>
      <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type='email'/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type='primary'>
              Register
          </Button>
        </div>
      </Form>
    </div>
  )
}
