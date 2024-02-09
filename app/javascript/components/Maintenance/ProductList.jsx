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

const ProductList = () => {
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
  const listColumns = [
    {
      title: `${message.Maintenance.productNumber}`,
      dataIndex: 'name',
      width: '10%',
      editable: true,
    },
    {
      title: `${message.Maintenance.productName}`,
      dataIndex: 'age',
      width: '25%',
      editable: true,
    },
    {
      title: `${message.Maintenance.productPacking}`,
      dataIndex: 'address',
      width: '25%',
      editable: true,
    },
    {
      title: `${message.Maintenance.handlingFee}`,
      dataIndex: 'address',
      width: '10%',
      editable: true,
    },
    {
      title: `${message.Maintenance.storageFee}`,
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

  const mergedListColumns = listColumns.map((col) => {
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
        <div>
          <div className='' style={{ marginRight: '80px' }}>
            <Button onClick={showModal}>{message?.Maintenance?.addNew}</Button>
            <Modal title="品名マスタ" open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="ok" onClick={handleOk}>
                  {message.Maintenance.register}
                </Button>,
                <Button key="cancel" onClick={handleCancel}>
                  {message.buttons.cancel}
                </Button>,
                <Button key="delete" onClick={handleCancel}>
                  {message.buttons.delete}
                </Button>
              ]}>

              <div>
                <div><label style={{ marginRight: '25px' }}>{message.Maintenance.productNameID}</label> <Input style={{ width: '30%' }} name='品名id' /></div>
                <div><label style={{ marginRight: '38px' }}>{message.Maintenance.productNumber}</label><Input style={{ width: '40%', marginTop: '20px' }} name='品番' /></div>
                <div><label style={{ marginRight: '38px' }}>{message.Maintenance.productNumber}</label><Input style={{ width: '50%', marginTop: '20px' }} name='品名' /></div>
                <div><label >{message.Maintenance.productPacking}</label><Input style={{ width: '50%', marginTop: '20px' }} name='規格・荷姿' /></div>
                <div><label style={{ marginRight: '25px' }}>{message.Maintenance.unitPriceID}</label> <Select style={{ width: '30%' }} name='単価ID' /></div>
                <div><label style={{ marginRight: '42px' }}>{message.Maintenance.packing}</label><Input style={{ width: '30%' }} name='荷姿' /></div>
                <div><label style={{ marginRight: '25px' }}>{message.Maintenance.handlingFee}</label> <Input style={{ width: '30%' }} name='荷役料' /></div>
                <div><label style={{ marginRight: '27px' }}>{message.Maintenance.storageFee}</label><Input style={{ width: '30%' }} name='保管料' /></div>
                <div><label style={{ marginRight: '15px' }}>{message.Maintenance.billingClass}</label><Input style={{ width: '30%' }} name='請求区分' /></div>
              </div>
            </Modal>
          </div>
          <div className='flex flex-row items-center '>
            <div ><label style={{ marginRight: '5px' }}>品番</label> <Search style={{ width: '40%' }} name='品番' /></div>
            <div><label style={{ marginRight: '5px' }}>品名</label><Search style={{ width: '60%' }} name='品名' /></div>
            <div><Button>検索</Button></div>
          </div>
          <div className=''>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={data}
                columns={mergedListColumns}
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
export default ProductList;