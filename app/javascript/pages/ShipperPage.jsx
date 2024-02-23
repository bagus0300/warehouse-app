import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { shipperURL } from "../utils/contants";
import CTable from "../components/CTable";
import { Form, Input, Layout, Button, Modal, notification, Card } from "antd";

import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { openNotificationWithIcon } from "../components/common/notification";

import message from "../utils/content/jp.json";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomButton from "../components/common/CustomButton";
import $lang from "../utils/content/jp.json";
const { Content } = Layout;

const ShipperList = ({ is_edit }) => {
  const [form] = Form.useForm();
  const [updateData, setUpdateData] = useState({});
  const [isposted, setIsPosted] = useState(false);

  const [updateStatus, setUpdateStatus] = useState("Create");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);

  const getAllShipper = () => {
    axios.get(`${shipperURL}`).then((res) => {
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
        await axios.put(`${shipperURL}`, {
          id: updateData.id,
          ...shipper,
        });

        openNotificationWithIcon(
          "success",
          $lang.popConrimType.error,
          $lang.messages.success
        );

        setIsModalOpen(false);
        setIsPosted(!isposted);
      } else {
        await axios.post(`${shipperURL}`, shipper);

        openNotificationWithIcon(
          "success",
          $lang.popConrimType.error,
          $lang.messages.success
        );

        setIsModalOpen(false);
        setIsPosted(!isposted);
      }
    } catch (err) {
      openNotificationWithIcon(
        "error",
        $lang.popConrimType.error,
        $lang.messages.complete_all_nput_fields
      );
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
        // closing_date: moment(item.closing_date).format("YYYY-MM-DD"),
        closing_date: item.closing_date,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
    setUpdateData(item);
  };

  const onDelete = async (item) => {
    try {
      const response = await axios.delete(`${shipperURL}`, {
        data: { id: item.id },
      });
      setIsPosted(!isposted);

      openNotificationWithIcon(
        "success",
        $lang.popConrimType.success,
        $lang.messages.success
      );
    } catch (error) {
      openNotificationWithIcon(
        "error",
        $lang.popConrimType.error,
        $lang.messages.complete_all_nput_fields
      );
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
      title: `${$lang.shipper.name}`,
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
      title: `${$lang.shipper.mainAddress}`,
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
      title: `${$lang.shipper.tel_number}`,
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
      title: `${$lang.shipper.closing_date}`,
      dataIndex: "closing_date",
      key: "closing_date",
      // render: (txt) => moment(txt).format("YYYY-MM-DD"),
      // sorter: (a, b) =>
      //   a.closing_date.toLowerCase().localeCompare(b.closing_date.toLowerCase()),
      align: "center",
      width: "11%",
    },
    is_edit === 1 ? (
      {
        title: `${$lang.buttons.change}`,
        dataIndex: "operation",
        render: (text, record, dataIndex) => {
          return (
            <div className="flex justify-center items-center">
              <div className="hidden rounded-full">
                {/* {(star_color = record.done == true ? "text-yellow-500" : "")} */}
              </div>
              <div className="p-2 rounded-full cursor-pointer items-center text-center">
                <CustomButton
                  onClick={() => {
                    setUpdateStatus("Edit");
                    onAction(record);
                  }}
                  title={$lang.buttons.change}
                  icon={<EditOutlined />}
                  size="small"
                  className="btn-default btn-hover-black"
                  style={{ backgroundColor: "transparent", color: "#000" }}
                  visability={true}
                />{" "}
              </div>
              <div className="p-2 rounded-full cursor-pointer items-center text-center ml-2">
                <CustomButton
                  onClick={() => onDelete(record)}
                  title={$lang.buttons.delete}
                  icon={<DeleteOutlined />}
                  style={{ backgroundColor: "transparent", color: "#000" }}
                  size="small"
                  className="btn-default btn-hover-black"
                  visability={true}
                />
              </div>
            </div>
          );
        },
        align: "center",
      }
    ) : (
      <div></div>
    ),
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
              {is_edit === 1 ? (
                <Button
                  onClick={() => {
                    onAction();
                    setUpdateStatus("Create");
                  }}
                  className="btn-bg-black"
                >
                  {$lang?.Maintenance?.addNew}
                </Button>
              ) : (
                <div></div>
              )}
              <Modal
                title={$lang.Maintenance.shipperMaster}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="ok" onClick={onSubmit} className="btn-bg-black">
                    {$lang.Maintenance.register}
                  </Button>,
                  <Button key="cancel" onClick={handleCancel}>
                    {$lang.buttons.cancel}
                  </Button>,
                ]}
              >
                <div className="" style={{ marginTop: 30 }}>
                  <Form
                    form={form}
                    size="middle"
                    scrollToFirstError
                    labelCol={{ span: 7 }}
                    labelAlign="left"
                  >
                    <Form.Item
                      label={$lang.Maintenance.shipperName}
                      name={"name"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.shipper.code}
                      name={"code"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.Maintenance.postCode}
                      name={"post_code"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.shipper.main_address}
                      name={"main_address"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.shipper.sub_address}
                      name={"sub_address"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.shipper.tel_number}
                      name={"tel"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.shipper.closing_date}
                      name={"closing_date"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input type="number" />
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
