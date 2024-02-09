import React, { useState } from 'react';
import { Form, Input, InputNumber, Layout, Popconfirm, Select, Table, Typography, Button, Modal, Tabs } from 'antd';

import NavbarSection from '../layouts/Header/Navbar';
import FooterSection from '../layouts/Footer/Index';

import message from "../../utils/content/jp.json"
import { render } from 'react-dom';
const { Search } = Input;


const { Content } = Layout;

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `${i}`,
    age: 32,
    address: `no. ${i}`,
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
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

const UnitPrice = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
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
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const priceColumns = [
    {
      title: `${message.Maintenance.unitPriceID}`,
      dataIndex: 'name',
      width: '10%',
      editable: true,
    },
    {
      title: `${message.Maintenance.packing}`,
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: `${message.Maintenance.handlingFeeUnitPrice}`,
      dataIndex: 'address',
      width: '10%',
      editable: true,
    },
    {
      title: `${message.Maintenance.storageFeeUnitPrice}`,
      dataIndex: 'address',
      width: '10%',
      editable: true,
    },
    {
      title: `${message.Maintenance.billingClass}`,
      dataIndex: 'address',
      width: '10%',
      editable: true,
    },
    {
      title: '',
      width: '10%',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link

              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            {message.Maintenance.change}
          </Typography.Link>
        );
      },
    },
  ];

  const mergedPriceColumns = priceColumns.map((col) => {
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
    <div>
      <NavbarSection />
      <Content style={{ width: 1024 }}
        className="mx-auto flex flex-col content-h">
        <div className='flex flex-col items-center'>
          <div>
            <span>{message.Maintenance.unitPriceID}</span>
            <span style={{ marginLeft: '110px' }}>{message.Maintenance.packing}</span>
          </div>
          <div className='flex flex-row items-center'>
            <Input style={{ width: "14%" }} />
            <Input style={{ width: "29%" }} />
            <Input style={{ width: "14%" }} />
            <Input style={{ width: "14%" }} />
            <Select
              style={{ width: "10%" }}
              defaultValue={message.Maintenance.fullTimeRequest}
              options={[
                {
                  value: `${message.Maintenance.fullTimeRequest}`,
                  label: `${message.Maintenance.fullTimeRequest}`,
                },
                {
                  value: 'one',
                  label: 'one',
                },
                {
                  value: 'three',
                  label: 'three',
                },
                {
                  value: 'four',
                  label: 'four',
                },
              ]}
            />
            <Button style={{ marginLeft: "70px", width: "10%" }}>
              {message.Maintenance.register}
            </Button>
          </div>
          <div className='mt-2'>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={data}
                columns={mergedPriceColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </div>
        </div>
      </Content>
      <FooterSection />

    </div>
  );
};
export default UnitPrice;