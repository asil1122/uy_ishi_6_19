import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useGetUsers } from './service/query/useGetUsers';
import { useDeleteUser } from './service/mutation/useDeleteUser';
import { useEditUser } from './service/mutation/useEditUser';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const Home = () => {
  const [form] = Form.useForm();
  const { data: users, refetch } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: editUser } = useEditUser();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (users) {
      setData(users.map(user => ({
        key: user.id,
        name: user.name,
        age: user.age,
        email: user.email,
      })));
    }
  }, [users]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: record.name,
      age: record.age,
      email: record.email,
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = { ...item, ...row };
        newData.splice(index, 1, updatedItem);
        setData(newData);
        setEditingKey('');
        editUser({ id: key, data: updatedItem }, {
          onSuccess: () => {
            message.success('User updated successfully');
            refetch();
          },
          onError: () => {
            message.error('Failed to update user');
          },
        });
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
      render: (email) => (
        <Button
          target="_blank"
          variant="link"
          type="default"
        >
          {email}
        </Button>
      ),
    },
    {
      title: "Action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
              color='primary'
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" color='primary' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button onClick={() => deleteUser(record.key, { onSuccess: refetch })} type="primary" >
              Delete
            </Button>
            <Button type='primary' disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{ onChange: cancel }}
      />
    </Form>
  );
};
