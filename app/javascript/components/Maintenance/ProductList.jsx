import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Layout, Popconfirm, Select, Table, Typography, Button, Modal, notification } from 'antd';

import NavbarSection from '../layouts/Header/Navbar';
import FooterSection from '../layouts/Footer/Index';

import message from "../../utils/content/jp.json"
import axios from 'axios';
const { Search } = Input;


const { Content } = Layout;
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
  const [allData, setAllData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [packing, setPacking] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [price, setPrice] = useState([]);
  const [priceId, setPriceID] = useState('');
  const [priceOne, setPriceOne] = useState({});
  const [] = useState('');
  const [] = useState('');
  const [] = useState('');


  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleNumber = (e) => {
    setNumber(e.target.value);
  }

  const handlePacking = (e) => {
    setPacking(e.target.value);
  }

  const handleUnitPrice = (value) => {
    setUnitPrice(value);
  }
  //   const getOne = () => {
  //     const one = price.find(item => item.id === unitPrice);
  //     setPriceOne(one);
  //   }

  // useEffect(()=>{
  //   getOne();
  // },[unitPrice])


  const getAllPrice = () => {
    axios.get('http://127.0.0.1:3000/api/unit_price').then((res) => {
      let index = 0
      const priceData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      console.log(priceData)
      setPrice(priceData);

      const priceIds = priceData.map(item => item.id)
      setPriceID(priceIds)
    });
  }

  const getAllProduct = () => {
    axios.get('http://127.0.0.1:3000/api/product').then((res) => {
      let index = 0
      const productData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });

      setAllData(productData);

    });
  }

  useEffect(() => {
    getAllProduct();
    getAllPrice();
  }, [])


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (name && number && packing && unitPrice) {
      axios.post('http://127.0.0.1:3000/api/product', {
        name: name,
        number: number,
        packing: packing,
        unit_price_id: unitPrice
      })
        .then((res) => {
          notification.success({ message: "Success" })
          getAllProduct();
          setName('');
          setNumber('');
          setPacking('');
          setUnitPrice('');
          setIsModalOpen(false);

        })
    } else {
      notification.warning({ message: "Complete All Inputs!" })
    }

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
      dataIndex: 'number',
      width: '10%',
      editable: true,
    },
    {
      title: `${message.Maintenance.productName}`,
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: `${message.Maintenance.productPacking}`,
      dataIndex: 'packing',
      width: '25%',
      editable: true,
    },
    {
      title: `${message.Maintenance.handlingFee}`,
      dataIndex: 'handling_fee_unit',
      width: '10%',
      editable: true,
    },
    {
      title: `${message.Maintenance.storageFee}`,
      dataIndex: 'storage_fee_unit',
      width: '10%',
      editable: true,
    },
    {
      title: `${message.Maintenance.billingClass}`,
      dataIndex: 'billing_class',
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
        <div className='mt-'>
          <div className='' style={{ marginRight: '80px', marginTop: '10px' }}>
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
                <div>
                  <label style={{ marginRight: '38px' }}>{message.Maintenance.productNumber}</label>
                  <Input
                    type='text'
                    value={name}
                    onChange={handleName}
                    style={{ width: '40%', marginTop: '20px' }}
                  />
                </div>
                <div>
                  <label style={{ marginRight: '38px' }}>{message.Maintenance.productName}</label>
                  <Input
                    type='text'
                    value={number}
                    onChange={handleNumber}
                    style={{ width: '50%', marginTop: '20px' }}
                  />
                </div>
                <div>
                  <label >{message.Maintenance.productPacking}</label>
                  <Input
                    type='text'
                    value={packing}
                    onChange={handlePacking}
                    style={{ width: '50%', marginTop: '20px' }}
                  />
                </div>
                <div>
                  <label style={{ marginRight: '25px' }}>{message.Maintenance.unitPriceID}</label>
                  <Select
                    onChange={handleUnitPrice}
                    options={[...priceId].map((item) => ({
                      value: item,
                      label: item
                    }))}
                    value={unitPrice}
                    style={{ width: '30%' }}
                  />
                </div>
                <div>
                  <label style={{ marginRight: '42px' }}>{message.Maintenance.packing}</label>
                  <Input
                    style={{ width: '30%' }}
                    value={priceOne.packing}
                  />
                </div>
                <div><label style={{ marginRight: '25px' }}>{message.Maintenance.handlingFee}</label>
                  <Input
                    style={{ width: '30%' }}
                    value={priceOne.handling_fee_unit}
                  />
                </div>
                <div><label style={{ marginRight: '27px' }}>{message.Maintenance.storageFee}</label>
                  <Input
                    style={{ width: '30%' }}
                    value={priceOne.storage_fee_unit}
                  />
                </div>
                <div>
                  <label style={{ marginRight: '15px' }}>{message.Maintenance.billingClass}</label>
                  <Input
                    style={{ width: '30%' }}
                    value={priceOne.billing_class}
                  />
                </div>
              </div>
            </Modal>
          </div>
          <div className='flex flex-row items-center ' style={{ marginTop: '10px' }}>
            <div ><label style={{ marginRight: '5px' }}>品番</label> <Search style={{ width: '40%' }} name='品番' /></div>
            <div><label style={{ marginRight: '5px' }}>品名</label><Search style={{ width: '60%' }} name='品名' /></div>
            <div><Button>検索</Button></div>
          </div>
          <div className='' style={{ marginTop: '10px' }}>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={allData}
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