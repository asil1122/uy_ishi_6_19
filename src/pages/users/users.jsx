import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useCreateUser } from './service/mutation/useCreateUser';

export const Users = () => {
  const { mutate } = useCreateUser();  
  const [form] = Form.useForm();

  const submit = (data) => {
    mutate(data,{
      onSuccess: () => {
        message.success('success')
        form.resetFields();
      }
    })
  }

  return (
    <div>
      <Form form={form} name='basic' layout='vertical' style={{ maxWidth: 600 }} onFinish={submit}>
      <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          <Input type='email' />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: "Please input your age!",
            },
          ]}
        >
          <Input type='number' />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}
