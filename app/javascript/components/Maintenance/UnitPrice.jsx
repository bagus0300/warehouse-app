import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Layout, Popconfirm, Select, Table, Typography, Button, Modal, Tabs, notification } from 'antd';
import axios from 'axios';
import { unitPriceURL } from '../../utils/contants';
import NavbarSection from '../layouts/Header/Navbar';
import FooterSection from '../layouts/Footer/Index';

import message from "../../utils/content/jp.json"


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

const UnitPrice = () => {
  const [form] = Form.useForm();
  const [allData, setAllData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const [id, setID] = useState('');
  const [packing, setPacking] = useState('');
  const [handleUnit, setHandleUnit] = useState('');
  const [stoUnit, setStoUnit] = useState('');
  const [billClass, setBillClass] = useState('');

  const handleId = (e) => {
    setID(e.target.value);
  }

  const handlePacking = (e) => {
    setPacking(e.target.value);
  }
  const handleHandle = (e) => {
    setHandleUnit(e.target.value);
  }
  const handleSto = (e) => {
    setStoUnit(e.target.value)
  }
  const handleBC = (value) => {
    setBillClass(value)
  }
  const getAllPrice = () => {
    axios.get('http://127.0.0.1:3000/api/unit_price').then((res) => {
      let index = 0
      const priceData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      setAllData(priceData);
      // console.log(priceData, 'resData')
      // console.log(allData, 'allData')
    });
  }

  useEffect(() => {
    getAllPrice();
  }, [])

  const create = () => {

    if (packing && handleUnit && stoUnit && billClass) {
      axios.post('http://127.0.0.1:3000/api/unit_price', {
        packing: packing,
        handling_fee_unit: handleUnit,
        storage_fee_unit: stoUnit,
        billing_class: billClass
      })
        .then((res) => {
          notification.success({ message: "Success" })
          getAllPrice();
        })
    } else {
      notification.warning({ message: "Complete All Input!" })
    }
  }


  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      packing: '',
      handling_fee_unit: '',
      storage_fee_unit: '',
      billing_class: `${message.Maintenance.fullTimeRequest}`,
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
      const newData = [...allData];
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
      dataIndex: 'id',
      width: '10%',
      editable: true,
      height: '20px'
    },
    {
      title: `${message.Maintenance.packing}`,
      dataIndex: 'packing',
      width: '20%',
      editable: true,
    },
    {
      title: `${message.Maintenance.handlingFeeUnitPrice}`,
      dataIndex: 'handling_fee_unit',
      width: '10%',
      editable: true,
    },
    {
      title: `${message.Maintenance.storageFeeUnitPrice}`,
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
        inputType: col.dataIndex === 'id' ? 'number' : 'text',
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
          <div style={{ marginTop: "10px", marginBottom: '10px' }}>

            <span style={{ marginLeft: '130px' }}>{message.Maintenance.packing}</span>
          </div>
          <div className='flex flex-row items-center'>
            {/* <Input
              type='text'
              name="id"
              style={{ width: "14%" }}
              value={id}
              onChange={handleId}

            /> */}
            <Input
              type='text'
              name='packing'
              value={packing}
              onChange={handlePacking}
              style={{ marginLeft: '14%', width: "29%" }}
            />
            <Input
              type='text'
              name='handling_fee_unit'
              value={handleUnit}
              onChange={handleHandle}
              style={{ width: "14%" }}
            />
            <Input
              type='text'
              name='unitPrice.storage_fee_unit'
              value={stoUnit}
              onChange={handleSto}
              style={{ width: "14%" }}
            />

            <Select
              style={{ width: "10%" }}
              defaultValue={message.Maintenance.fullTimeRequest}
              options={[
                {
                  value: `${message.Maintenance.fullTimeRequest}`,
                  label: `${message.Maintenance.fullTimeRequest}`,
                },
                {
                  value: `${message.Maintenance.firstBilling}`,
                  label: `${message.Maintenance.firstBilling}`,
                }
              ]}
              onChange={handleBC}
              value={billClass}
            />
            <Button
              onClick={create}
              style={{ marginLeft: "70px", width: "10%" }}>
              {message.Maintenance.register}
            </Button>
          </div>
          <div className='mt-2' style={{ marginTop: '10px' }}>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={allData}
                columns={mergedPriceColumns}
                rowClassName="editable-row"
                pagination={{
                  // onChange: cancel,

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