import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { shipperUrl } from "../utils/contants";
import CTable from "../components/CTable";
import {
  Form,
  Input,
  Layout,
  Table,
  Button,
  Modal,
  notification,
  Flex,
  Card,
} from "antd";

import {
  TrashIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import message from "../utils/content/jp.json";

let plan_color, star_color, plan_text;

const { Content } = Layout;

const ShipperList = () => {
  const [form] = Form.useForm();
  const [updateData, setUpdateData] = useState({});
  const [isposted, setIsPosted] = useState(false);

  const [updateStatus, setUpdateStatus] = useState("Create");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);

  const getAllShipper = () => {
    axios.get(`${shipperUrl}`).then((res) => {
      let index = 1;
      const shipperData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      setAllData(shipperData);
    });
  };

  const onSubmit = async () => {
    try {
      let shipper = await form.validateFields();
      if (updateData) {
        await axios.put(`${shipperUrl}`, {
          id: updateData.id,
          ...shipper,
        });
        notification.success({ message: "Update Success", duration: 1 });
        setIsModalOpen(false);
        setIsPosted(!isposted);
      } else {
        await axios.post(`${shipperUrl}`, shipper);
        notification.success({ message: "Create Success", duration: 1 });
        setIsModalOpen(false);
        setIsPosted(!isposted);
      }
    } catch (err) {
      notification.error({
        message: "Complete All Input Fields.",
        duration: 1,
      });
    }
  };

  useEffect(() => {
    getAllShipper();
  }, [isposted]);

  const onAction = async (item) => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        main_address: item.main_address,
        sub_address: item.sub_address,
        code: item.code,
        post_code: item.post_code,
        tel: item.tel,
        closing_date: moment(item.closing_date).format("YYYY-MM-DD"),
      });
    } else {
      form.resetFields();
    }

    setIsModalOpen(true);
    setUpdateData(item);
  };

  const onDelete = async (item) => {
    try {
      const response = await axios.delete(`${shipperUrl}`, {
        data: { id: item.id },
      });
      setIsPosted(!isposted);
      notification.success({ message: "Delete Success.", duration: 1 });
    } catch (error) {
      notification.error({ message: "Server Error", duration: 1 });
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const shipperListColumns = [
    {
      title: "No",
      dataIndex: "key",
      align: "center",
      width: "8%",
    },
    {
      title: `${message.shipper.name}`,
      key: "name",
      dataIndex: "name",
      align: "center",
      render: (text, record, dataIndex) => {
        return (
          <div>
            {record.name.slice(0, 18)}
            {text.length >= 18 ? "..." : ""}
          </div>
        );
      },
    },
    {
      title: `${message.shipper.mainAddress}`,
      dataIndex: "main_address",
      key: "main_address",
      align: "center",
      render: (text, record, dataIndex) => {
        return (
          <div>
            {record.main_address.slice(0, 18)}
            {text.length >= 18 ? "..." : ""}
          </div>
        );
      },
    },
    {
      title: `${message.shipper.tel_number}`,
      dataIndex: "tel",
      key: "tel",
      align: "center",
      render: (text, record, dataIndex) => {
        return (
          <div>
            {record.tel.slice(0, 18)}
            {text.length >= 18 ? "..." : ""}
          </div>
        );
      },
    },
    {
      title: `${message.shipper.closing_date}`,
      dataIndex: "closing_date",
      key: "closing_date",
      render: (txt) => moment(txt).format("YYYY-MM-DD"),
      // sorter: (a, b) =>
      //   a.closing_date.toLowerCase().localeCompare(b.closing_date.toLowerCase()),
      align: "center",
      width: "11%",
    },
    {
      title: `${message.buttons.change}`,
      dataIndex: "operation",
      render: (text, record, dataIndex) => {
        return (
          <div className="flex justify-center items-center">
            <div className="hidden rounded-full">
              {(star_color = record.done == true ? "text-yellow-500" : "")}
            </div>
            <div className="p-2 rounded-full cursor-pointer items-center text-center">
              <PencilSquareIcon
                shape="circle"
                className="w-20"
                style={{ marginRight: "5px" }}
                onClick={() => {
                  setUpdateStatus("Edit");
                  onAction(record);
                }}
              />
            </div>
            <div className="p-2 rounded-full cursor-pointer items-center text-center">
              <TrashIcon
                shape="circle"
                className="w-20"
                onClick={() => {
                  onDelete(record);
                }}
              />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  return (
    <div>
      <Content
        style={{ width: 1024 }}
        className="mx-auto flex flex-col content-h"
      >
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-2 my-2"
          bordered={false}
        >
          <div>
            <div className="mt-5" style={{ marginLeft: "880px" }}>
              <Button
                onClick={() => {
                  onAction();
                  setUpdateStatus("Create");
                }}
                className="btn-bg-black"
              >
                {message?.Maintenance?.addNew}
              </Button>
              <Modal
                title={message.Maintenance.shipperMaster}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="ok" onClick={onSubmit}>
                    {message.Maintenance.register}
                  </Button>,
                  <Button key="cancel" onClick={handleCancel}>
                    {message.buttons.cancel}
                  </Button>,
                ]}
              >
                <div>
                  <Form
                    form={form}
                    size="middle"
                    scrollToFirstError
                    labelCol={{ span: 7 }}
                    labelAlign="left"
                  >
                    <Form.Item
                      label={message.Maintenance.shipperName}
                      name={"name"}
                      rules={[
                        {
                          required: true,
                          message: `${message.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={message.shipper.code}
                      name={"code"}
                      rules={[
                        {
                          required: true,
                          message: `${message.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={message.Maintenance.postCode}
                      name={"post_code"}
                      rules={[
                        {
                          required: true,
                          message: `${message.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={message.shipper.main_address}
                      name={"main_address"}
                      rules={[
                        {
                          required: true,
                          message: `${message.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={message.shipper.sub_address}
                      name={"sub_address"}
                      rules={[
                        {
                          required: true,
                          message: `${message.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={message.shipper.tel_number}
                      name={"tel"}
                      rules={[
                        {
                          required: true,
                          message: `${message.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={message.shipper.closing_date}
                      name={"closing_date"}
                      rules={[
                        {
                          required: true,
                          message: `${message.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input type="date" />
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
            <div className="mt-5">
              <CTable
                rowKey={(node) => node.id}
                dataSource={allData}
                columns={shipperListColumns}
                pagination={true}
              />
            </div>
          </div>
        </Card>
      </Content>
    </div>
  );
};
export default ShipperList;
